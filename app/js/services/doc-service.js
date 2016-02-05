(function() {
  'use strict';

  angular.module('docKip.services')
    .factory('Documents', ['$resource', '$http', '$q',
      function($resource, $http, $q) {

        var document = $resource('/api/documents/:id', {
          id: '@_id'
        }, {
          update: {
            method: 'PUT'
          }
        }, {
          stripeTrailingSpaces: false
        });

        // Get all documents by limit
        document.getDocsByLimit = function(limit) {
          var deferred = $q.defer();
          $http.get('/api/documents/limit/' + limit)
          .success(deferred.resolve)
            .error(deferred.reject);
          return deferred.promise;
        };

        // Get documents by their roles
        document.getDocsByRoles = function(role, limit) {
          var deferred = $q.defer();
          $http.get('/api/documents/' + role + '/' + limit)
            .success(deferred.resolve)
            .error(deferred.reject);
          return deferred.promise;

        };

        // Get documents by date created
        document.getDocsByDate = function(date, limit) {
          var deferred  = $q.defer();
          $http.get('/api/documents/' + date + '/' + limit)
            .success(deferred.resolve)
            .error(deferred.reject);
          return deferred.promise;

        };
        return document;
      }
    ]);
})();
