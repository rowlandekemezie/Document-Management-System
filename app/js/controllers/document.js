(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('DocumentCtrl', ['Documents', 'Roles', '$state', '$rootScope', 'Utils', '$scope', '$stateParams', '$log', '$mdDialog',
      function(Documents, Roles, $state, $rootScope, Utils, $scope, $stateParams, $log, $mdDialog) {

        $scope.init = function() {
          Documents.get({
            id: $stateParams.id
          });
        };

        // Create document function
        $scope.createDoc = function() {
          $scope.document.ownerId = $stateParams.id;
          $scope.document.role = $rootScope.loggedInUser.role;
          Documents.save($scope.document, function(err, res) {
            if (!err && res) {
              Utils.toast(res.message);
              $scope.status = res.message + "\n Click cancel to return to your documents";
            } else {
              $scope.status = err.message || err || 'Could not create';
            }
          });
        };

        // Update Document function
         function updateFn () {
          Documents.update($scope.docDetail, function(err, res) {
            if (!err && res) {
              $scope.status = res.message + ". You can proceed to your page";
            } else {
              $scope.status = err.message || err || 'Could not Update';
            }
          });
        }

        // load document to view
        $scope.getDoc = function() {
          Documents.get({
            id: $stateParams.docid
          }, function(res) {
            $scope.docDetail = res;
          });
          $scope.roles = Roles.query();
        };
        $scope.getDoc();


        // delete document function
        function deleteDocFn() {
          Documents.remove({
            id: $scope.docDetail._id
          }, function() {
            Utils.toast('Your document has been successfully deleted');
            delete $scope.docDetail;
          }, function() {
            $scope.status = 'There was problem deleting document';
          });
        }


        // A confirmation message before deleting
        $scope.deleteDoc = function(event) {
          Utils.dialog('Warning: Delete Document, ' +
            $scope.docDetail.title + '?',
            'Are you sure you want to delete, ' +
            $scope.docDetail.title + '?',
            event, deleteDocFn
          );
        };

        // A confirmation message before deleting
         $scope.updateDoc = function(event) {
          Utils.dialog('Warning: Update Document, ' +
            $scope.docDetail.title + '?',
            'Are you sure you want to update, ' +
            $scope.docDetail.title + '?',
            event, updateFn
          );
        };

        // edit button
        $scope.editButton = function() {};

        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.hide = function() {
          $mdDialog.hide();
        };

      }
    ]);
})();