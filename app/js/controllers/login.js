(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('LoginCtrl', [
      '$scope',
      '$state',
      '$rootScope',
      'Auth',
      'Users',
      'Utils',
      function($scope, $state, $rootScope, Auth, Users, Utils) {

        // check that a user is logged in for each request on a route
        $rootScope.$on(['$stateChangeStart',
          function() {
            $scope.loggedIn = Auth.isLoggedIn();
            // get the user details
            Auth.getUser().then(function(response) {
              $rootScope.loggedInUser = response.data;
            });
          }
        ]);
        // function to submit form
        $scope.login = function() {
          $scope.user = {};
          $scope.processing = true;
          $scope.message = '';
          Users.login($scope.user)
            .success(function(response) {
              $scope.processing = false;
              // if user successfully logs in,
              // redirect the user to users page
              if (response.success) {
                Auth.setToken(response.token); // Rememeber to remove redundancy here!
                $rootScope.loggedInUser = response;
                $state.go('dashboard');
              } else {
                $state.go('login');
                $scope.user = '';
                $scope.message = response.message;
              }
            });
        };
        // // function to logout user
        // $scope.doLogout = function() {
        //   Auth.logout();
        //   $scope.user = '';
        //   $state('login');
        // };
      }
    ]);
})();