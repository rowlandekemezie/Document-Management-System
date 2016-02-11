(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('DocumentCtrl', ['Documents', '$rootScope', 'Utils', '$scope', '$stateParams', '$log', '$mdDialog',
      function(Documents, $rootScope, Utils, $scope, $stateParams, $log, $mdDialog) {

        $scope.init = function() {
          Documents.get({
            id: $stateParams.id
          });
        };

        // Create document
        $scope.createDoc = function() {
          $scope.type = 'create';
          $scope.document.ownerId = $stateParams.id;
          $scope.document.role = $rootScope.loggedInUser.role;
          // $scope.document.ownerTitle = $rootScope.loggedInUser.userName
          Documents.save($scope.document, function(err, res) {
            if (!err && res) {
              $log.info(res, "message from create document");
              Utils.toast(res.message);
              $scope.status = res.message + "\n Click cansel to return to your documents";
            } else {
              $scope.status = err.message || err || 'Could not create';
            }
          });
        };

        // Update Documents
        $scope.updateDoc = function() {
          Documents.update($scope.document, function(err, res) {
            $scope.type = 'edit';
            if (!err && res) {
              Utils.toast(res.message);
              $scope.status = res.message + ". You can proceed to your page";
            } else {
              $scope.status = err.message || err || 'Could not Update';
            }
          });
        };

        // cancel function
        $scope.cancel = function(){
          $mdDialog.cancel();
        };
      }
    ]);
})();