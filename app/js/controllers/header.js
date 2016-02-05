(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('HeadCtrl', ['$rootScope', '$scope', 'Auth', 'Users', '$state',
      function($rootScope, $scope, Auth, Users, $state) {
        $scope.logout = function() {
          Users.logout(function(err) {
            if (err) {
              return err;
            } else {
              delete $rootScope.loggedInUser;
              Auth.logout()
                .success(function() {
                  $state.go('login');
                });
            }
          });
        };
       // $scope.username = $rootScope.loggedInUser.username;
        //  check that the user is logged in
        $scope.loggedIn = Auth.isLoggedIn();
        console.log($scope.loggedIn);
        // ToDO: Details of logged in user
      }
    ]);
})();