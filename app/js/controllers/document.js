(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('DocumentCtrl', ['Documents',
      'Roles',
      '$state',
      '$rootScope',
      'Utils',
      '$scope',
      '$stateParams',
      '$interval',
      function(Documents, Roles, $state, $rootScope,
        Utils, $scope, $stateParams, $interval) {

        // progress bar
        $scope.determinateValue = 30;

        // Iterate every 100ms, non-stop
        $interval(function() {
          // Increment the Determinate loader
          $scope.determinateValue += 1;
          if ($scope.determinateValue > 100) {
            $scope.determinateValue = 30;
          }
        }, 100, 0, true);

        // init function
        Roles.query(function(res) {
          $scope.roles = res.slice(1, res.length);
        });

        // load document to view
        $scope.getDoc = function() {
          Documents.get({
            id: $stateParams.docid
          }, function(res) {
            $scope.docDetail = res;
          });
        };

        // Create document function
        $scope.createDoc = function() {
          $scope.document.ownerId = $stateParams.id;
          $scope.document.role = $rootScope.loggedInUser.role;
          Documents.save($scope.document, function(res) {
            Utils.toast(res.message);
            $state.go('dashboard', {
              id: $rootScope.loggedInUser._id
            }, {
              reload: true
            });
          }, function(err) {
            if (err.status === 409) {
              $scope.status = 'Document already exist.';
            } else {
              $scope.status = 'There was error creating your document.';
            }
          });
        };

        // delete document function
        $scope.deleteDocFn = function() {
          Documents.remove({
            id: $scope.docDetail._id
          }, function() {
            Utils.toast('Your document has been successfully deleted');
            $state.go('dashboard', {
              id: $rootScope.loggedInUser._id
            }, {
              reload: true
            });
          }, function() {
            $scope.status = 'There was problem deleting document';
          });
        };

        // A confirmation message before deleting
        $scope.deleteDoc = function(event) {
          Utils.dialog('Warning: Delete Document, ' +
            $scope.docDetail.title + '?',
            'Are you sure you want to delete, ' +
            $scope.docDetail.title + '?',
            event, $scope.deleteDocFn
          );
        };

        // Update Document function
        $scope.updateDocFn = function() {
          Documents.update($scope.docDetail, function(res) {
            Utils.toast(res.message);
            $state.go('dashboard', {
              id: $rootScope.loggedInUser._id
            }, {
              reload: true
            });
          }, function(err) {
            $scope.status = err.message || err || 'Could not Update';
          });
        };

        // A confirmation message before deleting
        $scope.updateDoc = function(event) {
          Utils.dialog('Warning: Update Document, ' +
            $scope.docDetail.title + '?',
            'Are you sure you want to update, ' +
            $scope.docDetail.title + '?',
            event, $scope.updateDocFn
          );
        };

        // Authenticate view privilieges
        $scope.canDelete = function() {
          if ($rootScope.loggedInUser._id === $scope.docDetail.ownerId ||
            $rootScope.loggedInUser.role === 'SuperAdmin') {
            return true;
          } else {
            return false;
          }
        };

        // Authenticate edit privileges
        $scope.canEdit = function() {
          if ($rootScope.loggedInUser._id === $scope.docDetail.ownerId) {
            return true;
          }
          if ($rootScope.loggedInUser.role === 'SuperAdmin') {
            return true;
          }
          if ($rootScope.loggedInUser.role === $scope.docDetail.role ||
            $rootScope.loggedInUser.role === 'Documentarian') {
            return true;
          } else {
            return false;
          }
        };
      }
    ]);
})();