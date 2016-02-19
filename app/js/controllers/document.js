(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('DocumentCtrl', ['Documents', 'Roles', '$state', '$rootScope', 'Utils', '$scope', '$stateParams',
      function(Documents, Roles, $state, $rootScope, Utils, $scope, $stateParams) {

        // init function
        $scope.init = function() {
          Roles.query(function(res) {
            $scope.roles = res;
          });
        };
        $scope.init();

        // Create document function
        $scope.createDoc = function() {
          $scope.document.ownerId = $stateParams.id;
          $scope.document.role = $rootScope.loggedInUser.role;
          Documents.save($scope.document, function(err, res) {
            if (!err && res) {
              Utils.toast(res.message);
              $state.go('dashboard({id:loggedInUser._id})');
              $scope.status = res.message + "\n Click cancel to return to your documents";
            } else {
              $scope.status = err.message || err || 'Could not create';
            }
          });
        };

        // load document to view
        $scope.getDoc = function() {
          Documents.get({
            id: $stateParams.docid
          }, function(res) {
            $scope.docDetail = res;
          });
        };
        $scope.getDoc();


        // delete document function
        $scope.deleteDocFn = function () {
          Documents.remove({
            id: $scope.docDetail._id
          }, function() {
            Utils.toast('Your document has been successfully deleted');
            delete $scope.docDetail;
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
        $scope.updateDocFn = function () {
          Documents.update($scope.docDetail, function(err, res) {
            if (!err && res) {
              $scope.status = res.message + ". You can proceed to your page";
            } else {
              $scope.status = err.message || err || 'Could not Update';
            }
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
        $scope.isAuthView = function() {
          if ($rootScope.loggedInUser._id === $stateParams.docid ||
            $rootScope.loggedInUser.userName === 'SuperAdmin') {
            return true;
          } else {
            return false;
          }
        };
      }
    ]);
})();