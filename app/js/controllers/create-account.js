(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('UserAccountCtrl', ['$state',
      '$scope',
      'Auth',
      'Users',
      '$rootScope',
      '$mdDialog',
      '$stateParams',
      'Roles',
      'Utils',
      function($state, $scope, Auth, Users, $rootScope,
        $mdDialog, $stateParams, Roles, Utils) {

        // get all roles from the Db
        $scope.init = function() {
          Roles.query(function(res) {
            $scope.roles = res.slice(1, res.length);
          });
        };

        $scope.loginUser = function() {
          $scope.status = '';
          Users.login($scope.user, function(err, res) {
            if (!err && res) {
              Auth.setToken(res.token);
              $rootScope.loggedInUser = res.user;
              $state.go('dashboard', {
                id: res.user._id
              }, {
                reload: true
              });
              Utils.toast('Welcome to DocKip ' + res.user.userName);
              $scope.status = res.message;
              $mdDialog.cancel();
            } else if (err.status === 406) {
              $scope.status = 'Error logging in.';
            } else {
              $scope.status = err.message;
            }
          });
        };

        // function to submit form
        $scope.signUp = function() {
          $scope.status = '';
          Users.save($scope.user, function() {
            $scope.loginUser();
          }, function(err) {
            if (err.status === 409) {
              $scope.status = 'User already exist';
            } else if (err.status === 406) {
              $scope.status = 'All fields are required.';
            } else {
              $scope.status = 'An error occured.';
            }
          });
        };
      }
    ]);
})();