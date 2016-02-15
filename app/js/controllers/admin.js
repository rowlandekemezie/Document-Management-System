(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('AdminCtrl', ['Roles', 'Documents', 'Users', '$scope', '$stateParams',
      function(Roles, Documents, Users, $scope, $stateParams) {
        $scope.admin = 'SuperAdmin';

        $scope.init = function() {
          $scope.users = Users.query();
          $scope.roles = Roles.query();
          $scope.documents = Documents.query();
         console.log($scope.documents, 'my documents');
        };
        //$scope.init();

      }
    ]);
})();
