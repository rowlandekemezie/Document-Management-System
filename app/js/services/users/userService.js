(function() {
  'use strict';
  angular.module('docKip.Services', [])
    .factory('User', ['$resource',
      function($resource) {
        return $resource('/api/users/:id', {
          id: '@_id'
        }, {
          update: 'PUT'
        }, {
          stripTrailingSpaces: false
        });
      }
    ]);
})();