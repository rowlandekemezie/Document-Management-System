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
      '$mdSidenav',
      function(Users, Roles, Documents, $scope, $rootScope,
        $stateParams, $mdSidenav) {

        $scope.param = {
          limit: 6,
          page: 1
        };

        $scope.init = function(param) {
          Users.getUserDocs({
              id: $stateParams.id
            }, param.limit, param.page,
            function(err, docs) {
              if (!err && docs) {
                $scope.userDocs = docs.data;
              }
            });

          Documents.getAllDocs(param.limit, param.page, function(err, docall) {
            if (!err && docall) {
              $scope.documents = docall;
            }
          });

          // Get document count for pagination
          Documents.allDocCount(function(err, num) {
            if (!err && num) {
              $scope.allDocCount = num;
            }
          });

          Documents.userDocCount($stateParams.id, function(err, num) {
            if (!err && num) {
              $rootScope.loggedInUser.docCount = num;
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

        $scope.numberOfPage = function() {
          var docCount = $rootScope.loggedInUser.docCount;
          return Math.ceil(docCount / $scope.param.limit);
        };

        $scope.disableNextPageUser = function() {
          return $scope.param.page + 1 > $scope.numberOfPage();
        };

        $scope.numberOfPages = function() {
          return Math.ceil($scope.allDocCount / $scope.param.limit);
        };

        // Admin privilege
        $scope.isAdmin = function() {
          if ($rootScope.loggedInUser.role === 'SuperAdmin' &&
            $rootScope.loggedInUser.userName === 'BuddyMaster') {
            return true;
          } else {
            return false;
          }
        };

        // Delete priviliege
        $scope.canDelete = function(doc) {
          if ($rootScope.loggedInUser._id === doc.ownerId ||
            $rootScope.loggedInUser.role === 'SuperAdmin') {
            return true;
          } else {
            return false;
          }
        };

        // Edit privileges
        $scope.canEdit = function(doc) {
          if ($rootScope.loggedInUser._id === doc.ownerId) {
            return true;
          }
          if ($rootScope.loggedInUser.role === 'SuperAdmin') {
            return true;
          }
          if ($rootScope.loggedInUser.role === doc.role ||
            $rootScope.loggedInUser.role === 'Documentarian') {
            return true;
          }
          return false;
        };

        $scope.close = function() {
          $mdSidenav('left').close();
        };
      }
    ]);
})();
