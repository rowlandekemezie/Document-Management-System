(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('AdminCtrl', [
      '$state',
      'Utils',
      'Roles',
      'Documents',
      'Users',
      '$scope',
      function($state, Utils, Roles, Documents, Users, $scope) {

        $scope.init = function() {
          Users.query(function(res) {
            $scope.users = res;
          });
          Roles.query(function(res) {
            $scope.roles = res;
          });
          Documents.query(function(res) {
            $scope.documents = res;
          });
        };

        $scope.init();

        // pagination
        $scope.options = {
          autoSelect: true,
          boundaryLinks: false,
          largeEditDialog: false,
          pageSelector: false,
          rowSelection: true
        };

        $scope.query = {
          order: '_id',
          limit: 5,
          page: 1
        };

        $scope.logPagination = function(page, limit) {
          console.log('page: ', page);
          console.log('limit: ', limit);
        };

         //delete buttoon for document
        $scope.deleteDocBtn = function(event, doc) {
          $scope.doc = doc;
          Utils.dialog('Warning: Delete Document, ' +
            $scope.doc.title + '?',
            'Are you sure you want to delete, ' +
            $scope.doc.title + '?',
            event, deleteDoc
          );
        };

        // delete document function
        function deleteDoc() {
          Documents.remove({
            id: $scope.doc._id
          }, function() {
            Utils.toast('Your document has been successfully deleted');
            $state.reload();
          }, function() {
            $scope.status = 'There was problem deleting document';
          });
        }

        // Create user function
        $scope.createUserBtn = function() {
          Users.save($scope.user, function() {
            Utils.toast('A new user has been created');
            $state.reload();
          }, function() {
            Utils.toast('Can not create User');
            $scope.status = 'An error occured';
          });
        };

        //Delete button
        function deleteUser() {
          Users.remove({
            id: $scope.user._id
          }, function() {
            Utils.toast('User deleted successfully');
            $state.reload($state.current.name);
          }, function() {
            $scope.status = 'There was error deleting the user';
          });
        }

        // Loading confirmation dialog box
        // A confirmation message before deleting
        $scope.deleteUserBtn = function(event, user) {
          $scope.user = user;
          Utils.dialog('Warning: Delete User ' +
            $scope.user.userName + '?',
            'Are you sure you want to delete, ' +
            $scope.user.userName + '?',
            event, deleteUser
          );
        };

        /**
         * CRUD for Roles
         *
         */
        $scope.createRoleBtn = function() {
          Roles.save($scope.role, function() {
            Utils.toast('Role created');
            $state.reload();
          }, function() {
            Utils.toast('Can not create role');
            $scope.status =
              'There was  error creating role';
          });
        };

        // delete role function
        function deleteRole() {
          Roles.remove({
            id: $scope.role._id
          }, function() {
            Utils.toast('Role successfully deleted');
            $state.reload();
          }, function() {
            $scope.status = 'There was problem deleting the role';
          });
        }

        //laod up a comfirmation dialog
        $scope.deleteRoleBtn = function(event, role) {
          $scope.role = role;
          Utils.dialog('Warning: Delete Role, ' +
            $scope.role.title + '?',
            'Are you sure you want to delete, ' +
            $scope.role.title + '?',
            event, deleteRole
          );
        };

        // Get userName of document creator by id
        $scope.getName = function(id) {
          for (var i = 0, n = $scope.users; i < n.length; i++) {
            if (id === n[i]._id) {
              return n[i].userName;
            }
          }
        };
      }

    ]);
})();