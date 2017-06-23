(function() {
  'use strict';

  var env = process.env.NODE_ENV || 'development';
  if (env === 'development') {
    require('dotenv').load();
  }

   var database = require('./server/config/database')[env];
    var mongoose = require('mongoose'),
    path = require('path'),
    express = require('express'),
    app = require('./server/config/express'),
    initDb =  require('./seeds/user'),

    port = process.env.PORT || 5555;

    mongoose.Promise = global.Promise;
  // connection to the database;
    mongoose.connect(database.url, function(err) {
    if (err) {
    console.log('Error connecting to the database');
    console.log(err);
  } else {
    console.log('Connected to the database...');
    if (env === 'test' || process.argv[2] === 'initDb' ) {
      mongoose.connection.db.dropDatabase(function(err) {
        if (err) {
          return err;
        } else {
          console.log('Dropped database...');
          console.log('Seeding database...');
          initDb();
        }
      });
    }
  }
 });
  // view engine setup
  app.set('views', path.join(__dirname, 'app/views'));
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
  app.route('/*').get(function (req, res) {
   return res.sendFile(path.join(__dirname, './public/index.html'));
 });

  var server = app.listen(port, function() {
    console.log('Express server listening on %d, in %s' +
      ' mode', server.address().port, app.get('env'));
  });

  // expose the  server to app
  module.exports = app;
})();
