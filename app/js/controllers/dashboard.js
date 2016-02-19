(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('DashboardCtrl', ['Utils', 'Users', 'Roles', 'Documents',
      '$scope', '$rootScope', '$stateParams', '$state', '$mdSidenav',
      function(Utils, Users, Roles, Documents, $scope, $rootScope, $stateParams, $state, $mdSidenav) {

        $scope.init = function() {
          Users.getUserDocs({
            id: $stateParams.id
          }, function(docs) {
            $scope.userDocs = docs;
          }, function(err) {
            if (err.status === 404) {
              $scope.message = 'You\'ve no document yet. Start today';
            }
          });
           Documents.query(function(docs){
            $scope.documents = docs;
           });
           Users.query(function(users){
              $scope.users = users;
           });
        };
        $scope.init();

        // Get userName of document creator by id
        $scope.getName = function(id) {
          for (var i = 0, n = $scope.users; i < n.length; i++) {
            if (id === n[i]._id) {
              return n[i].userName;
            }
          }
        };

        $scope.isAdmin = function() {
          if ($rootScope.loggedInUser.role === 'SuperAdmin') {
            return true;
          } else {
            return false;
          }
        };

        $scope.toggleList = function() {
          $mdSidenav('left').toggle();
        };
      }
    ]);
})();