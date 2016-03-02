(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('HeadCtrl', ['$rootScope', '$scope', 'Auth', 'Users',
      '$state', '$mdSidenav', 'Utils', '$route',
      function($rootScope, $scope, Auth, Users,
        $state, $mdSidenav, Utils, $route) {

        $scope.logoutUser = function() {
          Users.logout(function(err, res) {
            if (!err && res) {
              Auth.logout();
              $rootScope.loggedInUser = '';
              Utils.toast(res.message);
              $state.go('home', {
                reload: true
              });
              $route.reload();
            } else {
              return err;
            }
          });
        };

        //  check that the user is logged in
        $scope.loggedIn = Auth.isLoggedIn();

        // Navbar toggle
        $scope.toggleList = function() {
          $mdSidenav('left').toggle();
        };
      }
    ]);
})();