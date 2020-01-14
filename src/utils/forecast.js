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
            callback(undefined,body.currently)
        }        
    })
}

module.exports = forecast