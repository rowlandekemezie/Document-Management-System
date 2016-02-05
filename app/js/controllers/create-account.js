(function() {
  'use strict';
  angular.module('docKip.controllers')
    .controller('UserAccountCtrl', ['$state', '$scope', 'Auth', 'Users', '$log', '$rootScope', '$stateParams', 'Roles',
      function($state, $scope, Auth, Users, $log, $rootScope, $stateParams, Roles) {
        $log.warn('I got into the create user controller');
        // get all roles from the Db
        $scope.roles = Roles.query();
        $log.info($scope.roles);
        $scope.user = {};

        // function to submit form
        $scope.signUp = function() {
          $scope.status = '';
          Users.save($scope.user, function(err, res) {
            $log.warn($scope.user);
            if (!err && res) {
              Users.login($scope.user).then(function(res) {
                  Auth.setToken(res.token);
                  $rootScope.loggedInUser = res;
                  $log.info('I got here', res);
                  $state.go('dashboard', {
                    id: $stateParams.id
                  });
                },
                function(err) {
                  $scope.status = err[0].message || err.error ||
                    'Error loggin user in';
                  $scope.user = '';
                });
            } else {
              $scope.status = err.error || 'An error occured';
            }
          });
        };
      }
    ]);
})();