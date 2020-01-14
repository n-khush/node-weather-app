const request = require('request')
const geocode = (address,callback)=> {
    const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoibi1raHVzaCIsImEiOiJjazJicm13OWw0bXU4M2NwaTFoMm04cDY4In0.rnFeDhvfcCZwgC2ia1t-gg'
    request({url:url,json:true}, (err,{body})=>{
        if(err){
            callback('Unable to connect to location services!',undefined)
        }
        else if(body.features.length===0){
            callback('Please try another location', undefined)
        }
        else {
            data = { latitude : body.features[0].center[1] ,
                 longitude : body.features[0].center[1], 
                 location : body.features[0].place_name 
            }
            callback(undefined,data)
        }
    })
}

module.exports =  geocode