(function() {
  'use strict';

  var userRoute = require('./user.route'),
    documentRoute = require('./document.route'),
    roleRoute = require('./role.route'),

    /**
     * [defineRoute]
     * @param  {[FUNCTION]} router [Express router instance]
     * @return {[JSON]}        [returns Json Object]
     */
    defineRoutes = function(router) {
      userRoute(router);
      documentRoute(router);
      roleRoute(router);
    };

  module.exports = defineRoutes;
})();