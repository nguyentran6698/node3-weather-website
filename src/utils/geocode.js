const request = require('request');
const chalk = require('chalk');
const geocode = (address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoibmd1eWVudHJhbjY2OTgiLCJhIjoiY2tqOTQ3ejhmMmFvejJ6bnBjNTBhb2x2MSJ9.M-7dQUaWT9wa7nRLl_OoUA&limit=1`
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to service',undefined);
        }
        else if(body.features.length === 0){
            callback('Unable to find location. Try another search.',undefined);
        }
        else{
            callback(undefined,{
                latitude :body.features[0].center[1],
                longtitude:body.features[0].center[0],
                location: body.features[0].place_name
            })
            
        }
    })

}

module.exports = geocode;

