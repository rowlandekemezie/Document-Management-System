(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('AdminCtrl', ['$log', '$state', 'Utils', 'Roles', 'Documents', 'Users', '$scope',
      function($log, $state, Utils, Roles, Documents, Users, $scope) {

        $scope.init = function() {
          $scope.users = Users.query();
          $scope.roles = Roles.query();
          $scope.documents = Documents.query();
          for (var i = 0, l = $scope.users.length; i < l; i++) {
            for (var j = 0, n = $scope.documents.length; j < n; j++) {
              if ($scope.documents[j].ownerId === $scope.users[i]._id) {
                $scope.users[i].docSum = $scope.documents[j].count;
              }
            }
          }
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

        //Delete button
        function deleteUser() {
          Users.remove({
            id: $scope.user._id
          }, function() {
            Utils.toast('User deleted successfully');
            $state.reload($state.current);
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

        // Create user function
        $scope.createUser = function() {
          Users.save($scope.user, function(res) {
            if (res.status !== 500) {
              Utils.toast('A new user has been created');
              $state.reload();
            } else {
              $scope.status = res.err || 'An error occured';
            }
          });
        };

        /**
         * CRUD for Roles
         *
         */
        $scope.createRoleBtn = function() {
          Roles.save({
            title: $scope.title
          }, function(err, res) {
            if (!err && res) {
              //$scope.status = res.message;
              $state.reload();
            } else {
              $scope.status = err || err.message || 'There was  error creating role';
            }
          });
        };
        /**
         * [updateRole method]
         * @return {[type]} [description]
         */
        function updateRole() {
          Roles.update({
            id: $scope.role._id
          }, function() {
            Utils.toast('Role successfully updated');
            $state.reload();
          }, function() {
            $scope.status = 'Role could not be updated';
          });
        }

        // A confirmation message before updating role
        $scope.updateRoleBtn = function(event, role) {
          $scope.role = role;
          Utils.dialog('Warning: Update Document, ' +
            $scope.role.title + '?',
            'Are you sure you want to update, ' +
            $scope.role.title + '?',
            event, updateRole
          );
        };

        // delete role function
        function deleteRole() {
          Roles.remove({
            id: $scope.role._id
          }, function() {
            Utils.toast('Role successfully deleted');
            delete $scope.role;
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
            delete $scope.doc;
          }, function() {
            $scope.status = 'There was problem deleting document';
          });
        }
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
