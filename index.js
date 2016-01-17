(function() {
  'use strict';

  var env = process.env.NODE_ENV || 'development';
  if (env === 'development') {
    require('dotenv').load();
  }

  var database = require('./server/config/database')[env],
    mongoose = require('mongoose'),
    app = require('./server/config/express'),
    port = process.env.PORT || 5555;

  // connection to the database
  mongoose.connect(database.url);

  app.listen(port, function() {
    console.log('listening on port ' + port);
  });

  // expose the  server to app
  module.exports = app;
})();