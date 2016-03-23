// mysocket global socket

var express = require('express');
var router = express.Router();
var cookieSession = require('cookie-session');

//var newUser = require('../our_modules/fillDb').getNewUser();
//var newQuestion = require('../our_modules/fillDb').getNewQuestion();
//var newResponse = require('../our_modules/fillDb').getNewResponse();

/**********************************************************************************
 * 					  Middleware ➜ to use for all requests
 **********************************************************************************/
router.use(function(req, res, next) {
    console.log('Middleware called.');
    // allows requests fromt angularJS frontend applications
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // go to the next route
});


/**********************************************************************************
 *                Route for Home API
 **********************************************************************************/

router.get('/', function(req, res) {
    //res.json({ message: 'Hello from API documentation...' });
    //req.session.test = "test";
    console.log(req.session.visitCount);
    req.session.visitCount = req.session.visitCount ? req.session.visitCount + 1 : 1;
    //res.send('You have visited this page ' + req.session.visitCount + ' times');
    //res.json({ message: 'You have visited this page ' + req.session.visitCount + ' times' });
    res.cookie('visitCount', req.session.visitCount, { maxAge: 900000, httpOnly: false});
    res.json({ message: 'You have visited this page ' + req.session.visitCount + ' times' });
});


router.post('/', function(req, res) {
  console.log(req.body);
  //  req.session.visitCount = req.session.visitCount ? req.session.visitCount + 1 : 1;
   
    //res.cookie('visitCount', req.session.visitCount, { maxAge: 900000, httpOnly: false});
    res.json({ message: 'Ok' });
});

module.exports = router;