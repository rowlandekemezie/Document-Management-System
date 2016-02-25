(function() {
  'use strict';

  var config = require('./../../config/admin');

  /**
   * [roleAuth Middleware to protect role update route]
   * @param  {[http request]}   req  [http request body]
   * @param  {[http response]}   res  [http response on request]
   * @param  {control transfer} next [transfer control to the next middleeware]
   * @return {[JSON]}        [Json response]
   */
  module.exports = function(req, res, next) {
    if (req.decoded.role !== config.role) {
      res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    } else {
      next();
    }
  };
})();