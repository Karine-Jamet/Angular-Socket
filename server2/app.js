/*******************************************************************************
 *                                BASE SETUP
 *******************************************************************************/
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var http = require('http');

var routes = require('./routes/api');

var app = express();

/*******************************************************************************
 *                              ENGINE AND VIEWS
 *******************************************************************************/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*******************************************************************************
 *                                  APP USE
 *******************************************************************************/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({ secret: 'Ceciestunecleprivee' })); // session secret


// api accessible via ➜ http://localhost:port/api
app.use('/api', routes);



/*******************************************************************************
 *                                  APP DEBUG    
 *******************************************************************************/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.ejs', {
        message: err.message,
        error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.ejs', {
        message: err.message,
        error: {}
  });
});



module.exports = app;