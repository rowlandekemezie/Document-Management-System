(function() {

  'use strict';

  angular.module('docKip.services')
    .factory('Roles', ['$resource',
       function($resource) {
        return $resource('/api/roles/:id', {
          id: '@_id'
        }, {
          update: {
            method: 'PUT'
          }
        }, {
          stripeTrailingSpaces: false
        });
      }
    ]);
})();
