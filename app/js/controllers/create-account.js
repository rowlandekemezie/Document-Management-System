(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('UserAccountCtrl', ['$state', '$scope', 'Auth', 'Users', '$log', '$rootScope', '$mdDialog', '$stateParams', 'Roles', 'Utils',
      function($state, $scope, Auth, Users, $log, $rootScope, $mdDialog, $stateParams, Roles, Utils) {
        $log.warn('I got into the create user controller');

        // get all roles from the Db
        $scope.roles = Roles.query();
        $log.info($scope.roles);

        $scope.loginUser = function() {
          $scope.status = '';
          Users.login($scope.user).then(function(res) {
            Auth.setToken(res.token);
            $rootScope.loggedInUser = res.user;
            $scope.id = res.user._id;
            $state.go('dashboard', {
              id: $scope.id
            });
            Utils.toast('Welcome to DocKip '+ res.user.userName);
            $scope.status = res.message;
            $mdDialog.cancel();
          }, function(err) {
            $scope.status = err.message || err.error || 'not successful';
          });
        };

        // function to submit form
        $scope.signUp = function() {
          $scope.status = '';
          Users.save($scope.user, function(res) {
            // $log.warn($scope.user, 'user supplied details');
            if (res.status !== 500) {
              $scope.loginUser();
            } else {
              $scope.status = res.err || 'An error occured';
            }
          });
        };
      }
    ]);
})();