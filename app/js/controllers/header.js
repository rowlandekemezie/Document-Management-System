(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('HeadCtrl', ['$rootScope', '$scope', 'Auth', 'Users', '$state',
      function($rootScope, $scope, Auth, Users, $state) {
        $scope.logoutUser = function() {
          Auth.logout();
          $rootScope.loggedInUser = '';
          $state.go('home', {reload: true});
        };
        // $scope.username = $rootScope.loggedInUser.username;
        //  check that the user is logged in
        $scope.loggedIn = Auth.isLoggedIn();
        // console.log($scope.loggedIn);
        // ToDO: Details of logged in user
      }
    ]);
})();