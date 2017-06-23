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
            .then(function(res) {
              cb(null, res.data);
            })
            .catch(function(err) {
              cb(err);
            });
        };

        // logout service
        user.logout = function(cb) {
          $http.get('/api/users/logout')
            .then(function(res) {
              cb(null, res.data);
            })
            .catch(function(err) {
              cb(err);
            });
        };

        // get the details of the loggedIn user
        user.getUser = function(cb) {
          $http.get('/api/users/session', {
            cache: true
          })
            .then(function(res) {
              cb(null, res);
            })
            .catch(function(err) {
              cb(err, null);
            });
        };

        // get all user's documents
        user.getUserDocs = function(userId, limit, page, cb) {
          $http.get('/api/users/' + userId.id + '/documents?limit=' +
            limit + '&page=' + page)
            .then(function(res) {
              cb(null, res);
            })
            .catch(function(err) {
              cb(err, null);
            });
        };
        return user;
      }
    ]);
})();