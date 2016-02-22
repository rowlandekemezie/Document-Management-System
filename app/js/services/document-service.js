(function() {
  'use strict';

  angular.module('docKip.services')
    .factory('Documents', ['$resource', '$http',
      function($resource, $http) {

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
        document.getDocsByLimit = function(limit, cb) {
          $http.get('/api/documents/limit/' + limit)
            .success(function(res){
              cb(null, res);
            })
            .error(function(err){
              cb(err);
            });
        };

        // Get documents by their roles
        document.getDocsByRole = function(role, limit, cb) {
          $http.get('/api/documents/' + role + '/' + limit)
            .success(function(res){
              cb(null, res);
            })
            .error(function(err){
              cb(err);
            });
        };

        // Get documents by date created
        document.getDocsByDate = function(date, limit, cb) {
        //   var deferred = $q.defer();
          $http.get('/api/documents/' + date + '/' + limit)
            .success(function(res){
              cb(null, res);
            })
            .error(function(err){
              cb(err);
            });

        };
        return document;
      }
    ]);
})();
