var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var port = 3000;

app.use(express.static(__dirname + '/views'));  
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var weather = require('./app/weather');

app.use('/', weather);



app.listen(3000);