
const path = require('path');
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const hbs = require('hbs');
const express = require('express');
const app = express()

// console.log(__dirname); //directory
// console.log(path.join(__dirname,'../public'));  // path manipulation   
//define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public') 
const viewsPath = path.join(__dirname,'../templates/views') 
const partialsPath = path.join(__dirname,'../templates/partials')
// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);             //http://expressjs.com/en/4x/api.html#app.set
hbs.registerPartials(partialsPath);

// set up static directory to server    
app.use(express.static(publicDirectoryPath));
// main page
app.get('',(req,res)=>{
    res.render('index',{
        title: 'weather app',
        name: 'TechDotCone'
    });                                
})
// about page
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name: 'TechDotCone'
    })
})
// help page
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        name: 'Tech Dot Cone',
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide address of location",
        })
    }
    geocode( req.query.address,(error,{latitude,longtidue,location} = {})=>{
        if(error){
            return res.send({
                error:error,
            })
        }
        // latitude = 30.266666
        // longtidue = -97.733330
        forecast(latitude,longtidue,(error,forecastData)=>{
            if(error){
                return res.send({
                    error:error,
                })
            }
            res.send({
                location,
                forecastData:forecastData,
                address: req.query.address
            });
        })
     
    })
    
})




app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        product: [],

    })
})
app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404 Help',
        name: 'Tech Dot Cone',
        errorMessage:'Help Article Not Found'
    });
})
// * match anything that has not match so far
app.get('*',(req,res)=>{
   res.render('404',{
       title:'404 Page',
       name: 'Tech Dot Cone',
       errorMessage:'Page not Found'
   })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
}) //start up the server app.listen(port,callback)


// *************************** Note for this section ************************ //
// app.get('',(req,res)=>{         // route

//     res.send('<h1>Weather</h1>'); //handler
// })


//app.com
//app.com/help
//app.com/about
// nmp i hbs
// npm i express

// app.listen((port),callback)
// app.get('/....',(callback))
// app.get('/....',(req,res)=>{
    // res.send();
//})
// __dirname : directory name
// path.join(__dirname,'../public')  --- path manipulation
// app.use(express.static(publicDirectoryPath));
// app.set('view engine', 'hbs'); // this support for hbs modules

// set up nodemone for app.js and hbs file: nodemon src/app.js -e js,hbs