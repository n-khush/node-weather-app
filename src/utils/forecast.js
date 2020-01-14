const request = require('request')
const forecast = (lat,long,callback) => {
    const url = 'https://api.darksky.net/forecast/49bf9315fd838fe6a8aa760651a8e504/'+lat+','+long+'?units=si'
    request({url:url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to use forecast services!',undefined)
        }
        else if(body.error){
            callback(body.error,undefined)
        }
        else {
             callback(undefined,body.daily.data[0].summary+'. This is currently '+body.currently.temperature+' degrees out there, the high today is '+body.daily.data[0].temperatureHigh+' with a low of '+body.daily.data[0].temperatureLow+'. There are '+((body.currently.precipProbability)*100) +'% chances of rain')
        }        
    })
}

module.exports = forecast