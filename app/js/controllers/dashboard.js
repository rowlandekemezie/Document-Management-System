(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('DashboardCtrl', ['Utils', 'Users', 'Roles', 'Documents',
      '$scope', '$rootScope', '$stateParams', '$state', '$mdSidenav',
      function(Utils, Users, Roles, Documents, $scope, $rootScope, $stateParams, $state, $mdSidenav) {

        $scope.init = function() {
          Users.getUserDocs($stateParams.id).then(function(docs) {
            $scope.userDocs = docs;
          }, function(err) {
            if (err.status === 404) {
              $scope.message = 'You\'ve no document yet. Start today';
            }
          });
          $scope.documents = Documents.query();
          $scope.users = Users.query();
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

        $scope.isAdmin = function(){
          if($rootScope.loggedInUser.role === 'SuperAdmin'){
            return true;
          } else {
            return false;
          }
        };
        // user inner view goes here

        // // document count
        // for (var i = 0, n = $scope.documents.length; i < n; i++) {
        //   $scope.docCount = 0;
        //   for (var j = 0, m = $scope.users.length; j < m; j++) {
        //     if ($scope.documents[i].ownerId === $scope.users[j]._id) {
        //       $scope.docCount++;
        //     }
        //     $scope.users[j].docCount = $scope.docCount;
        //     $log.info($scope.users[j]);
        //   }
        // }

        $scope.toggleList = function() {
          $mdSidenav('left').toggle();
        };
      }
    ]);
})();