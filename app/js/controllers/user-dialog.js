(function() {
  'use strict';
  angular.module('docKip.controllers')
    .controller('UserDialogCtrl', ['$mdDialog', '$scope', '$mdMedia',
      function($mdDialog, $scope, $mdMedia) {
        // Accomodating different screen sizes
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        // Opens the signup dialog
        $scope.signUp = function(ev) {
          var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/users/create-account.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
          })
            .then(function() {}, function() {});
          $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
          }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
          });
        };

        // Open modal to sign in
        $scope.loginUser = function(ev) {
          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/login.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
            .then(function() {}, function() {});
        };

        // Login event listener
        $scope.createAccount = function(ev) {
          $scope.signUp(ev);
        };

        // SignUp event listener
        $scope.signInUser = function(ev) {
          $scope.loginUser(ev);
        };
      }
    ]);
  // modal dialog controller
  function DialogController($mdDialog, $scope) {
    // cancel the dialog
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    // hide the dialog
    $scope.hide = function() {
      $mdDialog.hide();
    };
  }
})();