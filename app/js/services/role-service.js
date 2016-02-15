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
          },
          method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }, {
          stripeTrailingSpaces: false
        });
      }
    ]);
})();
