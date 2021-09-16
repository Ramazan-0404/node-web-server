const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('views', path.join(__dirname, '../views'))

//set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'weather app',
        name: 'ramazan',
        coppyright: 'this website created ramazan goren'
    })
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'about app',
        name: 'ramazan',
        coppyright: 'this website created ramazan goren'
    })
});

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'this is a help page',
        title: 'help',
        name: 'ramazan ',
        coppyright: 'this website created ramazan goren'
    })
})

app.get('/weather',(req, res)=>{

    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    else{

        geocode(req.query.address, (error, {latitude, longitude, location }={})=>{
  
            if (error) {
              return res.send({error: error});
            }
          
              forecast(latitude, longitude, (error, forecastData) => {
                
                if (error) {
                  return res.send({error: error});
                }

                res.send({
                    forecast: forecastData.weather_descriptions,
                    location: location,
                    address: req.query.address,
                    temperature: forecastData.temperature
                })
          
              })
          });
    }


})


// app.get('/products', (req, res)=>{

//     if (!req.query.search) {
//         return res.send({
//             error: 'you must provide a search term'
//         })
//     }
//     console.log(req.query.rating);
//     res.send({
//         products:[]
//     })
// })

app.get('/help/*',(req, res)=>{
    res.render('404', {
        title:'404',
        name: 'ramazan goren',
        errorMessage: 'help article not found'

    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'ramazan',
        errorMessage: 'page not found'
    })
})

app.listen(3000, ()=>{
    console.log('server is up on port 3000');
})


