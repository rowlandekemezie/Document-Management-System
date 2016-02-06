(function(){
  'use strict';
  angular.module('docKip.controllers')
  .controller('DashboardCtrl', ['Utils', 'Users', 'Roles', 'Documents', '$scope', '$rootScope',
   function(Utils, Users, Roles, Documents, $scope, $rootScope){
   // Update user modal
        $scope.editUser = function(ev){
           $mdDialog.show({
            controller: 'UserCtrl',
            templateUrl: 'views/edit-profile.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function(){}, function(){});
        };
  }]);
})();