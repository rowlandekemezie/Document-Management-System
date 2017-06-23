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
          },
          query: {
            method: 'GET',
            isArray: false
          }
        }, {
          stripeTrailingSpaces: false
        });

        // Get all documents by limit
        document.getAllDocs = function(limit, page, cb) {
          $http.get('/api/documents?limit=' + limit + '&page=' + page)
            .then(function(res) {
              cb(null, res.data);
            })
            .catch(function(err) {
              cb(err);
            });
        };

        // Get documents by their roles
        document.getDocsByRole = function(role, limit, cb) {
          $http.get('/api/documents/role/' + role + '/' + limit)
            .then(function(res) {
              cb(null, res.data);
            })
            .catch(function(err) {
              cb(err);
            });
        };

        // Get documents by date created
        document.getDocsByDate = function(date, limit, cb) {
          $http.get('/api/documents/date/' + date + '/' + limit)
            .then(function(res) {
              cb(null, res.data);
            })
            .catch(function(err) {
              cb(err);
            });
        };

        // get all user's documents
        document.userDocCount = function(userId, cb) {
          $http.get('/api/documents/getCount/' + userId)
            .then(function(res) {
              cb(null, res.data);
            })
            .catch(function(err) {
              cb(err);
            });
        };

        // get all user's documents
        document.allDocCount = function(cb) {
          $http.get('/api/documents/count/all')
            .then(function(res) {
              cb(null, res.data);
            })
            .catch(function(err) {
              cb(err);
            });
        };
        return document;
      }
    ]);
})();