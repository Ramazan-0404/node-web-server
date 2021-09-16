const request = require('request')


const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c12affedc18d644314f68b8f1f656e10&query=' + latitude + ',' + longitude + '&units=m';
  
     request( {url, json:true}, (error, {body}={}) => {
       if (error) {
         callback('unable to connect weatherstack', undefined)
       }else if(body.error) {
           callback('unable to find location',undefined)
       } else {
          callback(undefined, {
            weather_descriptions:body.current.weather_descriptions[0],
            temperature:body.current.temperature
          })
       }
     })
  }


module.exports = forecast;