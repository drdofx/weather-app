const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

// Define paths for Express config
const htmlPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views loocation
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(htmlPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Daffa'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About cat',
        name: 'Bewew'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help cats',
        text: 'Bewew needs help',
        name: 'Dabew'
    });
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        });
    } else {
        geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }
            forecast(latitude, longtitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                });
            });
        });
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search)
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Help article not found',
        name: 'Daffa'
    });
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Page not found',
        name: 'Daffa'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})

