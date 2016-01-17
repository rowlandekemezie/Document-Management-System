(function() {
  'use strict';

  var env = process.env.NODE_ENV || 'development';
  if (env === 'development') {
    require('dotenv').load();
  }

  var envVariables = {
    port: process.env.DATABASE_PORT,
    url: process.env.DATABASE_URL,
    secretKey: process.env.SECRET_KEY
  };

  module.exports = {
    development: envVariables,
    test: envVariables,
    production: envVariables,
    staging: envVariables
  };
})();