(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('HeadCtrl', ['$rootScope', '$scope', 'Auth', 'Users',
      '$state', '$mdSidenav','Utils', '$route',
      function($rootScope, $scope, Auth, Users,
        $state, $mdSidenav, Utils, $route) {

        $scope.logoutUser = function() {
          Users.logout().then(function(res) {
            Auth.logout();
            $rootScope.loggedInUser = '';
            Utils.toast(res.message);
            $state.go('home');
            $route.reload();
          }, function(err) {
            return err;
          });

        };
        //  check that the user is logged in
        $scope.loggedIn = Auth.isLoggedIn();

        $rootScope.toggleList = function() {
          $mdSidenav('left').toggle();
        };
      }
    ]);
})();