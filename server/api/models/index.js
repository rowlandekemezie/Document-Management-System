(function() {
  'use strict';

  var Role = require('./role.model'),
    User = require('./user.model'),
    Document = require('./document.model');

  module.exports = {
    Role: Role,
    User: User,
    Document: Document
  };
})();