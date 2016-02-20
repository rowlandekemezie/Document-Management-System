(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('UserAccountCtrl', ['$state', '$scope', 'Auth', 'Users', '$rootScope', '$mdDialog', '$stateParams', 'Roles', 'Utils',
      function($state, $scope, Auth, Users, $rootScope, $mdDialog, $stateParams, Roles, Utils) {

        // get all roles from the Db
        Roles.query(function(res) {
          $scope.roles = res;
        });

        $scope.loginUser = function() {
          $scope.status = '';
          Users.login($scope.user, function(err, res) {
            if (!err && res) {
              Auth.setToken(res.token);
              $rootScope.loggedInUser = res.user;
              $state.go('dashboard', {
                id: res.user._id
              });
              Utils.toast('Welcome to DocKip ' + res.user.userName);
              $scope.status = res.message;
              $mdDialog.cancel();
            } else {
              $scope.status = err.message || err.error || 'not successful';
            }
          });
        };

        // function to submit form
        $scope.signUp = function() {
          $scope.status = '';
          Users.save($scope.user, function(res) {
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