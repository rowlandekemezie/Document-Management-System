(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('UserCtrl', ['Users',
      '$scope', '$stateParams', '$state',
      function(Users, $scope, $stateParams, $state) {
        // delete a user
        $scope.deleteUser = function(user) {
          $scope.processing = true;
          user.$delete(function() {
            $state.go('dashboard'); // return to dashboard
          });
        };
        // get a specific user
        $scope.getAUser = function() {
          Users.get({
              id: $stateParams.id
            })
            .success(function(data) {
              $scope.user = data;
            });
        };
        // get all users
        Users.query()
          .success(function(users) {
            $scope.users = users;
          });
        // create user
        // instantiate the user class for any user
        $scope.newUser = new Users();
        $scope.addUser = function() {
          $scope.processing = true;
          $scope.newUser.$save()
            .success(function(response) {
              $scope.processing = false;
              $scope.message = response.message;
            });
        };
        // update user
        $scope.update = function() {
          $scope.processing = true;
          $scope.status = '';
          $scope.userData.$update()
            .success(function(response) {
              $scope.processing = false;
              $scope.userData = {};
              $scope.status = response.message;
              $state.go('dashboard.view-users');
            });
        };
        // load user's parameters
        Users.get({
            id: $stateParams.id
          })
          .success(function(data) {
            $scope.userData = data;
          });
      }
    ]);
})();
