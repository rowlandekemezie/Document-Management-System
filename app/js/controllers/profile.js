(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('EditProfileCtrl', ['Utils', 'Roles', 'Users', '$rootScope', '$scope', '$state',
      function(Utils, Roles, Users, $rootScope, $scope, $state) {

        // initialize
        $scope.init = function() {
          Roles.query(function(res) {
            $scope.roles = res.slice(1, res.length);
          });
        };
        $scope.init();

        $scope.editProfile = function() {
          angular.extend($rootScope.loggedInUser, {
            password: $scope.password
          });
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