'use strict';

var path = require('path');
var _ = require('lodash');
var common = require('../../common');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'ninja-test-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || '786564214750002',
    clientSecret: process.env.FACEBOOK_SECRET || '7aba7cf0ba9311d5743705608cf721e6',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  }
};

common.log(path.normalize(__dirname + '/../../..'));
common.log(__dirname + '/../../..');


// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
