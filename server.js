const express = require('express');
const hbs = require('hbs'); 
const fs = require('fs');

const port = process.env.PORT || 3000;
var app= express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//uses middleware
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${res.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next(); 
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});
 //http handeler,  req has all the header information for the request
 //app.get('/', (req, res) => {
 //   res.send({
 //       name: 'Andrew',
 //       likes: [
 //           'Biking', 
 //           'Cities'
 //       ]
 //});
 //});

//Home Route
app.get('/', (req, res) =>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the homepage!',
        currentYear: new Date().getFullYear()
    });
});

 //Route
 app.get('/about', (req, res) =>{
     res.render('about.hbs', {
         pageTitle: 'About page',
         currentYear: new Date().getFullYear()
     }); 
 });

 app.get('/projects', (req, res) =>{
     res.render('projects.hbs', {
         pageTitle: 'Projects Page',
         currentYear: new Date().getFullYear()
     });
 };

app.get('/bad', (req, res) =>{
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

//Route
 app.listen(port, ()=> {
     console.log('Server is up on 3000');
 });  //common port for dev locally
