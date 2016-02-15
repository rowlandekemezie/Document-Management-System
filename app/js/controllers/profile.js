(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('EditProfileCtrl', ['Utils', 'Roles', 'Users', '$rootScope', '$scope', '$log',
      function(Utils, Roles, Users, $rootScope, $scope, $log) {

        // initialize
        $scope.init = function() {
          $scope.roles = Roles.query();
        };
        $scope.init();

        $scope.editProfile = function() {
          Users.update($rootScope.loggedInUser, function(res) {
            Utils.toast(res.message);
          }, function(err) {
            $log.warn(err);
            $scope.status = err.message || err.error || 'Something went wrong';
          });
        };
      }
    ]);
})();