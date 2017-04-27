const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');

app.use((req, res, next)=>{
  var date = new Date().toString();
  var log = `${date} : ${req.method} ${req.url}`;
   fs.appendFile('server.log', log + '\n');
   next();
});
// app.use((re, res , next)=> {
//   res.render('maintainance.hbs')
// });
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (msg)=> {
  return msg.toUpperCase();
})

app.get('/', (req, res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home page',
    currentYear : new Date().getFullYear(),
    welcomeMsg : 'Welcom User'
  });
});

app.get('/about', (req, res)=> {
  res.render('about.hbs',{
    pageTitle: 'About page',
    currentYear : new Date().getFullYear()
  });
});

app.get('/bad', (req, res)=> {
  res.send({
    error : 'Error handling request'
  });
});

app.listen(3007, ()=> {
  console.log('Server is Up')
});
