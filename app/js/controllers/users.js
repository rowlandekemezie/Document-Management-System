angular.module('controllers.users', [])
  .controller('userCtrl', ['User',
    '$scope', '$routeParams', '$state',
    function(User, $scope, $stateParams, $window, $state) {
      // delete a user
      $scope.deleteUser = function(user) {
        $scope.processing = true;
        user.$delete(function() {
          $window.location.href = '/users/'; // return to home route
        });
      };
      // get a specific user
      $scope.getAUser = function() {
        User.get({
          id: $stateParams.id
        })
          .success(function(data) {
            $scope.user = data;
          });
      };
      // get all users
      User.query()
        .success(function(data) {
          $scope.users = data;
        });
      // create user
      // instantiate the user class for any user
      $scope.newUser = new User();
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
        $scope.message = '';
        $scope.userData.$update()
          .success(function(response) {
            $scope.processing = false;
            $scope.userData = {};
            $scope.message = response.message;
            $state.go('home');
          });
      };
      // load users parameters
      User.get({
        id: $stateParams
      })
        .success(function(data) {
          $scope.userData = data;
        });
    }
  ]);