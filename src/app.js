const path = require('path')
const express = require('express')
const hbs =  require('hbs')
const geocode =  require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Express configurations
const publicDirectory =  path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setting handlebars engine and views directory
hbs.registerPartials(partialsPath)
app.set('views',viewsPath)
app.set('view engine','hbs')

//Setting static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res) => {
    res.render('index', {
        'title':'Weather',
        'message':'This is homepage off the application',
        'name':'Naseem' 

    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        'title':'About me',
        'name':'Naseem' 
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        'title':'Help Page',
        'helpText':'This is some text',
        'name':'Naseem' 
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            'error':'Please provide an address for which you want forecast'
        })
    }

    //Getting forcast for queried address
    geocode(req.query.address,(error,{latitude = '',longitude = '',location = ''} = {})=>{
        if(error){
            return res.send({
                'error':error
            })
        }
        forecast(latitude, longitude, (error,{temperature,precipProbability}) => {
           if(error){
                return res.send({
                    'error':error
                })
           }
           res.send({
                forecast:'This is currently '+temperature+' degrees out there, There are '+((precipProbability)*100) +'% chances of rain',
                location:location,
                address:req.query.address
            })
         })
        
   })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
      'title'  :'Help Article',
      'message':'Help article not found',
      'name':'Naseem'
    })  
    })

app.get('*', (req,res)=>{
    res.render('404', {
      'title'  :'404 Page',
      'message':'Page not found',
      'name':'Naseem'
    })
})

app.listen(port, ()=> {
    console.log('Server is up on port '+port)
})