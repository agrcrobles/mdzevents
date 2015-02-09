//express
var express = require('express');

//config
var config = require('./config/config.js');
var routes = require('./config/routes.js');

var app = express();

app.use(express.compress());
app.use(config.allowCrossDomain);
app.use(express.bodyParser());

routes.config(app);

app.listen(3333);
console.log('Running on port 3333!');