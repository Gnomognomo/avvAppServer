var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = require('./routes/routes');
var fs = require("fs");
var morgan = require('morgan');
var errorhandler = require('errorhandler');
var jwtAuth = require('./controllers/jwauth');

var expressLogFile = fs.createWriteStream('./logs/express.log', {flags: 'a'});

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('combined',{stream: expressLogFile}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

//app.get("/users/list", jwtAuth, function(req,res,next){next()});
//app.all("/clients/*", jwtAuth, function(req,res,next){next()});
//app.all("/categories/*", jwtAuth, function(req,res,next){next()});
//app.all("/documents/*", jwtAuth, function(req,res,next){next()});
app.use('/api', router);

app.use(errorhandler({ dumpExceptions: true, showStack: true }));

function start(){
    var apiPort = 3000;
    // Start the server
    app.listen(apiPort);
    console.log('The magic happens on port ' + apiPort);
}

exports.start = start;
exports.app = app;
