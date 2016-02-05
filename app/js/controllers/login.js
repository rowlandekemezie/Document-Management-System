(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('LoginCtrl', [
      '$scope',
      '$state',
      '$rootScope',
      'Auth',
      'Users',
      '$timeout',
      '$log',
      '$stateParams',
      function($scope, $state, $rootScope, Auth, Users, $stateParams, $timeout, $log) {
        // login
        $scope.loginUser = function() {
          $scope.status = '';
          Users.login($scope.user).then(function(res) {
            $log.info('I got here');
            Auth.setToken(res.token);
            $rootScope.loggedInUser = res;
            $log.warn($rootScope.loggedInUser.username);
            $log.info(res);
            $state.go('dashboard', {
              id: $stateParams.id
           });
            $scope.status = res.message;
          }, function(err) {
            $log.warn(err, 'not successful');
          });
        };
      }
    ]);
})();