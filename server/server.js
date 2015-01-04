/**
 * Created by youngmoon on 1/2/15.
 */
/**
 *  Main server file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./config/environment');

var express = require('express');
//var config = require('./config/environment');

// Setup server
var app = express();
var server = require('http').createServer(app);

require('./routes')(app);
console.log(tg);
// Start server
server.listen(config.port, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;