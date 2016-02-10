(function() {
  'use strict';
  angular.module('docKip.controllers')
    .controller('DocumentCtrl', ['Documents', '$scope',
      function(Documents, $scope) {

          $scope.createDoc = function(){
            Documents.save($scope.document, function(err, res) {
            if (!err && res) {
              $scope.status = res.message;
            } else {
              $scope.status = err.message || err || 'Could not create';
            }
          });
        };

        if($scope.type === 'edit'){
          $scope.createDoc = Documents.update($scope.document, function(err, res) {
            if (!err && res) {
              $scope.status = res.message;
            } else {
              $scope.status = err.message || err || 'Could not create';
            }
          });
        }
      }
    ]);
})();