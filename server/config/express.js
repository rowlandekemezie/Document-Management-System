(function() {
  'use strict';

  var express = require('express'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    routes = require('./../api/routes');

  // mount an instance of express router on the routes
  var router = express.Router();
  routes(router);

  // instantiate an object instance of express
  var app = express();

  app.use(cookieParser());
  app.use(morgan('dev'));
  // connect to the database
  app.use(bodyParser.json());
  app.use(session({
    secret: 'I love andela',
    resave: false,
    saveUninitialized: true,
  }));

  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(bodyParser.json({
    type: 'application/vnd.api+json'
  }));
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // mount the router on api root directory
  app.use('/api', router);

  // expose app
  module.exports = app;
})();