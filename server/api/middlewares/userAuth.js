(function() {
  'use strict';

  var config = require('./../../config/pass'),
    jwt = require('jsonwebtoken');

  /**
   * [Authenthication middleware to protect certain routes]
   * @param {[http request]}   req  [http requset body]
   * @param {[http response]}   res  [http json response]
   * @param {Function} next [control transfer to the next function/middleware]
   */
  module.exports = function(req, res, next) {
    var token = req.body.token || req.query.token ||
    req.headers['x-access-token'] || req.params.token;
    if (!token) {
      res.status(403).json({
        success: false,
        message: 'Please provide your token'
      });
      return;
    } else {
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          res.status(401).json({
            success: false,
            message: 'Authentication failed'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  };
})();