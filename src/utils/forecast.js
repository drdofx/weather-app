const request = require('postman-request');

const forecast = (latitude, longtitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4ac9edb7ee5a84374a9d674b4078380d&query=${latitude},${longtitude}`;
    
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('unable to connect to weatherstack!', undefined);
        } else if (body.error) {
            callback('unable to find location!', undefined);
        } else {
            const time = body.current.observation_time
            const description = body.current.weather_descriptions[0];
            const temperature = body.current.temperature;
            const feelslike = body.current.feelslike;
            const humidity = body.current.humidity;
            callback(
                undefined,
                `Observation time: ${time} UTC.
                 ${description}. 
                 It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. 
                 The humidity is ${humidity}%.`
            );
        }
    })
};

module.exports = forecast;