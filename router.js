'use strict';

const express = require('express');
const crypto  = require('crypto');
const bodyParser  = require('body-parser');
const cfenv   = require('cfenv');

// create express instance
let oApp = express();

// Cloud Foundry environment variables
let oAppEnv = cfenv.getAppEnv();

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
oApp.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
oApp.use(bodyParser.json());

var current_date = (new Date()).valueOf().toString();
var random = Math.random().toString();
var jsessionid = crypto.createHash('sha1').update(current_date + random).digest('hex');

oApp.get('/api/router', function(request, response){

  console.log(request.headers);
  
  response.cookie('JSESSIONID', jsessionid, { maxAge: 9000000, httpOnly: true });

  response.json({info:"ok"});
});

// express app listener
oApp.listen(oAppEnv.port, function(){
    console.log('Server listening at ' + oAppEnv.url);
});