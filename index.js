(function() {
  'use strict';

  var env = process.env.NODE_ENV || 'development';
  if (env === 'development') {
    require('dotenv').load();
  }

  var database = require('./server/config/database')[env],
    mongoose = require('mongoose'),
    path = require('path'),
    express = require('express'),
    app = require('./server/config/express'),
    port = process.env.PORT || 5555;

  // connection to the database
  mongoose.connect(database.url, function() {
    console.log('Connection established successfully');
  });
  // view engine setup
  app.set('views', path.join(__dirname, 'server/views'));
  app.set('view engine', 'jade');

  // error handlers
  // development error handler
  // will print stacktrace
  if (env === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500).send(err.message);
      next();
    });
  }
  app.use(express.static(path.join(__dirname, './public')));
  // app.route('/*').get(function(req, res) {
  //   return res.sendFile(path.join(__dirname, './public/index.html'));
  // });

  var server = app.listen(port, function() {
    console.log('Express server listening on %d, in %s' +
      ' mode', server.address().port, app.get('env'));
  });

  // expose the  server to app
  module.exports = app;
})();