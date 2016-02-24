(function() {

  'use strict';

  angular.module('docKip.services')
    .factory('Users', ['$resource', '$http',
      function($resource, $http) {

        var user = $resource('/api/users/:id', {
          id: '@_id'
        }, {
          update: {
            method: 'PUT'
          }
        }, {
          stripTrailingSpaces: false
        });

        // login service
        user.login = function(user, cb) {
          $http.post('/api/users/login', user)
            .success(function(res) {
              cb(null, res);
            })
            .error(function(err) {
              cb(err);
            });
        };

        // logout service
        user.logout = function(cb) {
          $http.get('/api/users/logout')
            .success(function(res) {
              cb(null, res);
            })
            .error(function(err) {
              cb(err);
            });
        };

        // get the details of the loggedIn user
        user.getUser = function(cb) {
          $http.get('/api/users/userInSession', {
            cache: true
          })
            .success(function(res) {
              cb(null, res);
            })
            .error(function(err) {
              cb(err, null);
            });
        };

        // get all user's documents
        user.getUserDocs = function(userId, limit, page, cb) {
          $http.get('/api/users/' + userId + '/documents?limit=' +
            limit + '&page=' + page)
            .success(function(res) {
              cb(null, res);
            })
            .error(function(err) {
              cb(err, null);
            });
        };
        return user;
      }
    ]);
})();