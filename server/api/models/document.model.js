(function() {
  'use strict';

  var mongoose = require('mongoose'),
    date = require('./../../../seeds/dateHelper')(),

    // var Schema = mongoose.Shema;
    documentSchema = new mongoose.Schema({
      ownerId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true,
        validate: /[a-zA-Z\^w]/
      },
      role: {
        type: String,
        ref: 'Role'
      },
      createdAt: {
        type: String
      },
      lastModified: {
        type: Date,
        default: Date.now
      }
    });

  //set dateCreated and lastmodified to current date before saving a document
  documentSchema.pre('save', function(next) {
    var doc = this;
    doc.createdAt = date;
    next();
  });

  // The mongoose API requires the model name and schema to create the model
  module.exports = mongoose.model('Document', documentSchema);
})();