(function() {

  'use strict';
  angular.module('docKip.controllers')
    .controller('HomeCtrl', ['$mdDialog', '$scope',
      function($mdDialog, $scope) {

        // Opens the signup dialog
        $scope.signUp = function(ev) {
          $mdDialog.show({
            controller: 'UserAccountCtrl',
            templateUrl: 'views/users/create-account.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            preserveScope: true,
            scope: $scope,
            clickOutsideToClose: true
          })
            .then(function() {}, function() {});
         };

        // Open modal to sign in
        $scope.loginUser = function(ev) {
          $mdDialog.show({
            controller: 'UserAccountCtrl',
            preserveScope: true,
            templateUrl: 'views/login.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            scope: $scope,
            clickOutsideToClose: true
          })
            .then(function() {}, function() {});
        };

        // Signin event listener
        $scope.signInUser = function(ev) {
          $scope.loginUser(ev);
        };
      }
    ]);
 })();