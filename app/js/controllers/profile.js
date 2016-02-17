(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('EditProfileCtrl', ['Utils', 'Roles', 'Users', '$rootScope', '$scope', '$state',
      function(Utils, Roles, Users, $rootScope, $scope, $state) {

        // initialize
        $scope.init = function() {
          $scope.roles = Roles.query();
        };
        $scope.init();

        $scope.editProfile = function() {
          Users.update($rootScope.loggedInUser, function(res) {
            Utils.toast(res.message);
            $state.go('dashboard');
          }, function(err) {
            $scope.status = err.message || err.error || 'Something went wrong';
          });
        };
      }
    ]);
})();