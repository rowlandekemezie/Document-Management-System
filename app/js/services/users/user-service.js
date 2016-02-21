(function() {

  'use strict';

  angular.module('docKip.services')
    .factory('Users', ['$resource', '$http', '$q',
      function($resource, $http, $q) {

        var user = $resource('/api/users/:id', {
          id: '@_id'
        }, {
          update: {
            method: 'PUT'
          }
        }, {
          stripTrailingSpaces: false
        });

        // login
        user.login = function(user, cb) {
          // var deferred = $q.defer();
          $http.post('/api/users/login', user)
            .success(function(res) {
              cb(null, res);
            })
            .error(function(err) {
              cb(err);
            });
        };

        // logout
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
          // var deferred = $q.defer();
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
        user.getUserDocs = function(userId, cb) {
          // var deferred = $q.defer();
          console.log(userId, 'great day');
          $http.get('/api/users/' + userId.id + '/documents')
            .success(function(res) {
              cb(null, res);
            })
            .error(function(err) {
              cb(err, null);
            });
        };

        user.getDocCount = function() {
          var deferred = $q.defer();
          $http.get('/api/user/documents')
            .success(deferred.resolve)
            .error(deferred.reject);
          return deferred.promise;
        };
        return user;
      }
    ]);
})();