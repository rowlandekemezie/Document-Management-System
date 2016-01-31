(function() {
  'use strict';

  var mongoose = require('mongoose'),
    roleSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true,
        validate: {
          validator: function(v) {
            return /[a-zA-Z]/.test(v);
          },
          message: '{VALUE} is not a valid role!'
        },
      }
    });

  // convert to lowercase before saving
  roleSchema.pre('save', function(next) {
    var role = this;
    role.title.toLowerCase();
    return next();
  });

  // The mongoose API requires the model name and schema to create the model
  module.exports = mongoose.model('Role', roleSchema);
})();