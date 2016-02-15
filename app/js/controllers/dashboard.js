(function() {
  'use strict';
  angular.module('docKip.controllers')
    .controller('DashboardCtrl', ['Utils', 'Users', 'Roles', 'Documents',
      '$scope', '$rootScope', '$mdSidenav', '$mdDialog', '$log', '$stateParams', '$state',
      function(Utils, Users, Roles, Documents, $scope, $rootScope, $mdSidenav, $mdDialog, $log, $stateParams, $state) {
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

          $scope.documents = Documents.query();
          $scope.users = Users.query();

        };
        $scope.init();

        //TODO: sync with ui-sref
        $scope.editButton = function(user) {
          $scope.type = 'Edit';
        };

        // Get userName of document creator by id
        $scope.getName = function(id) {
          for (var i = 0, n = $scope.users; i < n.length; i++) {
            if (id === n[i]._id) {
              return n[i].userName;
            }
          }
        };

        //TODO: view-document
        $scope.docDetil = '';
        $scope.viewDoc = function(ev, data) {
          Documents.get({_id:data}, function(res){
            $scope.docDetail = res;
          });
          Utils.modal(ev, 'view/view-document.html', viewDocument);
        };

        function viewDocument($scope, $mdDialog) {
          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.hide = function() {
            $mdDialog.hide();
          };
        }
        $log.info($scope.docDetial);

        // .modal = function(ev, tmpl, ctrl) {
        //   $mdDialog.show({
        //     controller: ctrl,
        //     templateUrl: tmpl,
        //     parent: angular.element(document.body),
        //     targetEvent: ev,
        //     clickOutsideToClose: true,
        //     fullscreen: true
        //   });
        // };

        // delete documents
        $scope.deleteDoc = function(doc) {
          doc.$delete(function() {
            $state.go($state.current);
          });
        };

        // document count
        for (var i = 0, n = $scope.documents.length; i < n; i++) {
          $scope.docCount = 0;
          for (var j = 0, m = $scope.users.length; j < m; j++) {
            if ($scope.documents[i].ownerId === $scope.users[j]._id) {
              $scope.docCount++;
            }
            $scope.users[j].docCount = $scope.docCount;
            $log.info($scope.users[j]);

          }
        }

        // $scope.viewRoles = function(ev) {

        // };


        // Update user modal
        $scope.editUser = function(ev) {
          $mdDialog.show({
            controller: 'UserCtrl',
            templateUrl: 'views/edit-profile.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
            .then(function() {}, function() {});
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.hide = function() {
          $mdDialog.hide();
        };
      }
    ]);
})();