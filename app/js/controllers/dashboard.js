(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('DashboardCtrl', [
      'Users',
      'Roles',
      'Documents',
      '$scope',
      '$rootScope',
      '$stateParams',
      '$state',
      '$mdSidenav',
      function(Users, Roles, Documents, $scope, $rootScope,
        $stateParams, $state, $mdSidenav) {

        $scope.param = {
          limit: 6,
          page: 1
        };

        $scope.init = function(param) {
          Users.getUserDocs({id:$stateParams.id}, param.limit, param.page,
            function(err, docs) {
              if (!err && docs) {
                $scope.userDocs = docs;
              }
            });

          Documents.getAllDocs(param.limit, param.page, function(err, docall) {
            if (!err && docall) {
              $scope.documents = docall;
            }
          });

          Documents.userDocCount($stateParams.id, function(err, num) {
            if (!err && num) {
              $scope.docCount = num;
            }
          });

          // Get document count for pagination
          Documents.allDocCount(function(err, num) {
            if (!err && num) {
              $scope.allDocCount = num;
            }
          });

          Users.get({
            id: $stateParams.id
          }, function(user) {
            $scope.user = user;
          }, function(err) {
            console.log(err);
          });
        };

        $scope.init($scope.param);

        $scope.nextPage = function() {
          $scope.param.page += 1;
          $scope.init($scope.param);
        };

        $scope.previousPage = function() {
          $scope.param.page -= 1;
          $scope.init($scope.param);
        };

        $scope.disableNextPage = function() {
          return $scope.param.page + 1 > $scope.numberOfPages();
        };

        $scope.disablePreviousPage = function() {
          return $scope.param.page === 1;
        };

        $scope.numberOfPages = function() {
          return Math.ceil($scope.allDocCount / $scope.param.limit);
        };


        $scope.isAdmin = function() {
          if ($rootScope.loggedInUser.role === 'SuperAdmin' &&
            $rootScope.loggedInUser.userName === 'BuddyMaster') {
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