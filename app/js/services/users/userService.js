(function() {
  'use strict';
  angular.module('docKip.services')
    .factory('Users', ['$resource', '$http',
      function($resource, $http) {

        var user = $resource('/api/users/:id', {
          id: '@_id'
        }, {
          update: 'PUT'
        }, {
          stripTrailingSpaces: false
        });

        // login
        user.login = function(user, cb) {
          $http.post('/api/users/login')
            .success(function(res) {
              cb(null, res);
            })
            .error(function(err) {
              cb(err, null);
            });
        };

        // logout
        user.logout = function(cb) {
          $http.post('/api/users/logout')
            .success(function(res) {
              cb(null, res);
            })
            .error(function(err) {
              cb(err, null);
            });
        };

        // get all user's documents
        user.getUserDocs = function(user, cb) {
          $http.get('/api/users/' + user.id + '/documents')
            .success(function(docs) {
              cb(null, docs);
            })
            .error(function(err) {
              cb(err, null);
            })
        };
        return user;
      }
    ]);
})();