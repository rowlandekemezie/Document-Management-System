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
      function(Documents, Roles, $state, $rootScope,
        Utils, $scope, $stateParams) {

        // get role function
        Roles.query(function(res) {
          $scope.roles = res.slice(1, res.length);
        });

        $scope.docDetail = '';
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
      }
    ]);
})();