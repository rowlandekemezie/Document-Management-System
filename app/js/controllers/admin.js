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
      '$stateParams',
      function($state, Utils, Roles, Documents, Users, $scope, $stateParams) {
        switch ($stateParams.section) {
          case 'role':
            $scope.selectedIndex = 0;
            break;
          case 'user':
            $scope.selectedIndex = 1;
            break;
          case 'documents':
            $scope.selectedIndex = 2;
            break;
          default:
            $scope.selectedIndex = 0;
        }

        $scope.init = function() {
          Users.query(function(res) {
            $scope.users = res;
          });
          Roles.query(function(res) {
            $scope.roles = res;
          });
          Documents.getAllDocs(0, 0, function(err, res) {
            if (!err && res) {
              $scope.documents = res;
            }
          });
        };

        $scope.init();

        Users.get({
          id: $stateParams.id
        }, function(user) {
          $scope.user = user;
        }, function(err) {
          console.log(err);
        });

        // Delete buttoon for document
        $scope.deleteDocBtn = function(event, doc) {
          $scope.doc = doc;
          Utils.dialog('Warning: Delete Document, ' +
            $scope.doc.title + '?',
            'Are you sure you want to delete, ' +
            $scope.doc.title + '?',
            event, deleteDoc
          );
        };

        // Delete document function
        function deleteDoc() {
          Documents.remove({
            id: $scope.doc._id
          }, function(res) {
            Utils.toast('Document successfully deleted');
            $scope.documents.splice($scope.documents.indexOf(res.doc), 1);
          }, function() {
            $scope.status = 'There was problem deleting document';
          });
        }

        // Create user function
        $scope.createUserBtn = function() {
          Users.save($scope.newUser, function(res) {
            Utils.toast('A new user has been created');
            $scope.users.push(res.user);
            $scope.newUser = {};
          }, function() {
            Utils.toast('Can not create User');
            $scope.status = 'An error occured';
          });
        };

        // Delete user button
        function deleteUser() {
          $scope.status = '';
          Users.remove({
            id: $scope.user._id
          }, function(res) {
            Utils.toast('User deleted successfully');
            $scope.users.splice($scope.users.indexOf(res.user), 1);
          }, function() {
            $scope.status = 'There was error deleting the user';
          });
        }

        // A confirmation dialog before deleting
        $scope.deleteUserBtn = function(event, user) {
          $scope.user = user;
          Utils.dialog('Warning: Delete User ' +
            $scope.user.userName + '?',
            'Are you sure you want to delete, ' +
            $scope.user.userName + '?',
            event, deleteUser
          );
        };

        // Create role button
        $scope.createRoleBtn = function() {
          $scope.status = '';
          Roles.save($scope.newRole, function(res) {
            Utils.toast('Role created');
            $scope.roles.push(res.role);
            $scope.newRole = {};
          }, function() {
            Utils.toast('Can not create role');
            $scope.status =
              'There was  error creating role';
          });
        };

        // Delete role function
        function deleteRole() {
          $scope.status = '';
          Roles.remove({
            id: $scope.role._id
          }, function(res) {
            Utils.toast('Role successfully deleted');
            $scope.roles.splice($scope.roles.indexOf(res.role), 1);
          }, function() {
            $scope.status = 'There was problem deleting the role';
          });
        }

        // Comfirmation dialog for delete role
        $scope.deleteRoleBtn = function(event, role) {
          $scope.role = role;
          Utils.dialog('Warning: Delete Role, ' +
            $scope.role.title + '?',
            'Are you sure you want to delete, ' +
            $scope.role.title + '?',
            event, deleteRole
          );
        };
      }
    ]);
})();