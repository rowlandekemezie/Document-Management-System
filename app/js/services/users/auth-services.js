(function() {
  'use strict';

  angular.module('docKip.services')
    .factory('Auth', ['$q', 'AuthToken',
      function($q, AuthToken) {
        var authFactory = {};

        // Check that the user is loggedIn
        authFactory.isLoggedIn = function() {
          if (AuthToken.getToken()) {
            return true;
          } else {
            return false;
          }
        };

        // set the user's token in the local storage
        authFactory.setToken = function(token) {
          AuthToken.setToken(token);
        };

        // log a user out by clearing the token
        authFactory.logout = function() {
          AuthToken.setToken();
        };

        return authFactory;
      }
    ])

  //  Inject $window to store token on client-side
  .factory('AuthToken', ['$window',
    function($window) {
      var authTokenFactory = {};
      authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
      };
      // Set or clear token from local storage
      authTokenFactory.setToken = function(token) {
        if (token) {
          $window.localStorage.setItem('token', token);
        } else {
          $window.localStorage.removeItem('token');
        }
      };
      return authTokenFactory;
    }
  ])

  // Configuration to integrate token into  every requests
  .factory('AuthInterceptor', ['$q',
    '$location',
    'AuthToken',
    function($q, $location, AuthToken) {
      var interceptorFactory = {};
      interceptorFactory.request = function(config) {
        // Grab the token
        var token = AuthToken.getToken();
        // Attach the token to the headers
        if (token) {
          config.headers['x-access-token'] = token;
        }
        return config;
      };
      // Response error
      interceptorFactory.responseError = function(response) {
        // Check forbidden error
        if (response.status == 403) {
          AuthToken.setToken();
          $location.path('/');
        }
        // Return error from the server as a promise
        return $q.reject(response);
      };
      return interceptorFactory;
    }
  ]);
})();