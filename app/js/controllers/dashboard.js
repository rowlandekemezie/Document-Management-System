(function() {
  'use strict';
  angular.module('docKip.controllers')
    .controller('DashboardCtrl', ['Utils', 'Users', 'Roles', 'Documents',
      '$scope', '$rootScope', '$mdSidenav', '$mdDialog',
      function(Utils, Users, Roles, Documents, $scope, $rootScope, $mdSidenav, $mdDialog) {
        //this.toggleList = toggleMenuList();

        // Init function to get all documents for a loggedInUser
        $scope.init = function() {
          // items on the side bar
          $scope.sidebarMenu = [{
            name: 'View Roles'
          }, {
            name: 'View Users'
          }, {
            name: 'View Documents'
          }, {
            name: 'Edit Profile'
          }];
        };
        $scope.init();

        $scope.viewRoles = function(ev){

        };


        // Update user modal
        $scope.editUser = function(ev) {
          $mdDialog.show({
            controller: 'UserCtrl',
            templateUrl: 'views/edit-profile.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
            .then(function() {}, function() {});
        };
      }
    ]);


})();