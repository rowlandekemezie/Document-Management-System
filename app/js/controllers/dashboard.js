(function() {
  'use strict';
  angular.module('docKip.controllers')
    .controller('DashboardCtrl', ['Utils', 'Users', 'Roles', 'Documents',
      '$scope', '$rootScope', '$mdSidenav', '$mdDialog', '$log', '$stateParams',
      function(Utils, Users, Roles, Documents, $scope, $rootScope, $mdSidenav, $mdDialog, $log, $stateParams) {
        $log.warn('i got in here. Dashboard controller');
        // Init function to get all documents for a loggedInUser
        $scope.init = function() {
          Users.getUserDocs($stateParams.id).then(function(docs) {
            $scope.userDocs = docs;
          }, function(err) {
            if (err.status === 404) {
              $scope.message = 'You\'ve no document yet. Start today';
            }
            $log.warn(err, 'There was an error getting');
          });
        };
        $scope.init();

        // function to call the create document template
        $scope.addDoc

        $scope.documents = Documents.query();
        $log.info($scope.documents, 'doc res');
        $scope.users = Users.query();
        $log.info($scope.users, 'users res');
        // for (var i = 0, n = $scope.documents.length; i < n; i++) {
        //   $scope.docCount = 0;
        //   for (var j = 0, m = $scope.users.length; j < m; j++) {
        //     if ($scope.documents[i].ownerId === $scope.users[j]._id) {
        //       $scope.docCount++;
        //       $scope.documents[i].ownerTitle = $scope.users[j].userName;
        //     }
        //     $scope.users[j].docCount = $scope.docCount;
        //     $log.info($scope.users[j]);
        //   }
        //}
        // $scope.viewRoles = function(ev) {

        // };


        // // Update user modal
        // $scope.editUser = function(ev) {
        //   $mdDialog.show({
        //     controller: 'UserCtrl',
        //     templateUrl: 'views/edit-profile.html',
        //     parent: angular.element(document.body),
        //     targetEvent: ev,
        //     clickOutsideToClose: true
        //   })
        //     .then(function() {}, function() {});
        // };
      }
    ]);


})();