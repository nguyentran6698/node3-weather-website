const request = require('request');


const forecast = (latitude,longtitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=aca5e58790a97c9a7be5d9eb2bdc2a29&query=${latitude},${longtitude}&units=f`
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to sever',undefined);
        }else if(body.error){
            callback('Unable to find location!!!',undefined);
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+`. It is ${body.current.temperature} temperature, but it feels like ${body.current.feelslike} `)
        }
    })
}

module.exports = forecast;