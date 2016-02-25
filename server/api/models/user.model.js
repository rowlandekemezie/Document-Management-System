(function() {
  'use strict';

  var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),

    userSchema = new mongoose.Schema({
      userName: {
        type: String,
        required: true,
        unique: true
      },
      name: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        }
      },
      role: {
        type: String,
        ref: 'Role'
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
        minlength: 8
      }
    });

  // Bcrypt middleware on UserSchema
  userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) {
      return next();
    }

    // generate the hash
    bcrypt.hash(user.password, null, null, function(err, hash) {
      if (err) {
        return next(err);
      } else {
        // change the password to the hashed version
        user.password = hash;
        next();
      }
    });
  });

  //Password verification
  userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
  };

  // The mongoose API requires the model name and schema to create the model
  module.exports = mongoose.model('User', userSchema);
})();