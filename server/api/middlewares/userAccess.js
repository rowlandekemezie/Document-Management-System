(function() {
  'use strict';

  var Document = require('./../models/document.model'),
    config = require('./../../config/admin');

  /**
   * [userAccess middleware]
   * @param  {[http request]}   req  [http request params and body]
   * @param  {[http response]}   res  [response based on request]
   * @param  {[control transfer]} next [transfer control to next middleware]
   * @return {[access privilege]}        [Json response]
   */
  module.exports = function(req, res, next) {
    Document.findById(req.params.id, function(err, doc) {
      if (err) {
        res.status(500).json(err);
      } else {
        if (!doc) {
          res.status(404).json({
            success: false,
            message: 'Document not available'
          });
        } else {
          if (JSON.stringify(req.decoded._id) !== JSON.stringify(doc.ownerId[0]) &&
            req.decoded.role !== config.role &&
            req.decoded.role !== 'Documentarian') {
            res.status(403).json({
              success: false,
              message: 'Forbidden. You don\'t have the permission'
            });
          } else {
            next();
          }
        }
      }
    });
  };
})();