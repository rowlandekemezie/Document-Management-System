(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('LoginCtrl', [
      '$scope',
      '$state',
      '$rootScope',
      'Auth',
      'Users',
      // '$timeout',
      // '$log',
      '$stateParams',
      '$mdDialog',
      function($scope, $state, $rootScope, Auth, Users, $stateParams, $mdDialog) {

        // login
        $scope.user = {};
        $scope.loginUser = function() {
          $scope.status = '';
          Users.login($scope.user).then(function(res) {
            Auth.setToken(res.token);
            $rootScope.loggedInUser = res;
            $state.go('dashboard', {
              id: $stateParams.id
           });
            $scope.status = res.message;
            $mdDialog.cancel();
          }, function(err) {
            $scope.status = err.message || err.error || 'not successful';
          });
        };
      }
    ]);
})();