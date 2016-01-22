(function() {
  'use strict';
  angular.module('docKip.controllers', [])
    .controller('loginCtrl', [
      '$scope',
      '$rootScope',
      '$location',
      'Auth',
      function($scope, $location, $rootScope, Auth) {
        // check that the user is logged in
        $scope.loggedIn = Auth.isLoggedIn();
        // check that a user is logged in for each request on a route
        $rootScope.$on(['$routeChangeStart',
          function() {
            $scope.logged = Auth.isLoggedIn();
            // get the user details
            Auth.getUser().then(function(response) {
              $scope.user = response.data;
            });
          }
        ]);
        // function to submit form
        $scope.doLogin = function() {
          $scope.processing = true;
          $scope.error = '';
          Auth.login($scope.loginData.username, $scope.loginData.password)
            .success(function(response) {
              $scope.processing = false;
              // is user successfully logs in, redirect the user to users page
              if (response.success) {
                $location.path('/users');
              } else {
                $scope.error = response.message;
              }
            });
        };
        // function to logout user
        $scope.doLogout = function() {
          Auth.logout();
          $scope.user = '';
          $location.path('/login');
        };
      }
    ]);
})();