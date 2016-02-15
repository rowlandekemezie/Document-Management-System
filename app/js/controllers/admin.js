(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('AdminCtrl', ['$log', '$state', 'Utils', 'Roles', 'Documents', 'Users', '$scope', '$stateParams',
      function($log, $state, Utils, Roles, Documents, Users, $scope, $stateParams) {

        $scope.admin = 'SuperAdmin';
        $log.warn('I got into the Admin panel controller');

        $scope.init = function() {
          $scope.users = Users.query();
          $scope.roles = Roles.query();
          $scope.documents = Documents.query();
        };
        $scope.init();

        //Delete button
        function deleteUser(userId) {
          Users.remove(userId, function() {
            Utils.toast('User deleted successfully');
            $state.reload();
          }, function() {
            $scope.status = 'There was error deleting the user';
          });
        }
        // Loading confirmation dialog box
        // A confirmation message before deleting
        $scope.deleteUserBtn = function(event) {
          Utils.dialog('Warning: Delete User, ' +
            $scope.userDetail.userName + '?',
            'Are you sure you want to delete, ' +
            $scope.userdDetail.userName + '?',
            event, deleteUser
          );
        };
        /**
         * CRUD for Roles
         *
         */
        $scope.createRoleBtn = function() {
          Roles.save($scope.title, function(err, res) {
            if (!err && res) {
              $scope.status = res.message;
              $state.reload();
            } else {
              $scope.status = err || err.message || 'There was  error creating role';
            }
          });
        };

        function updateRole(role) {
          Roles.update({
            id: role._id
          }, function() {
            Utils.toast('Role successfully updated');
            $state.reload();
          }, function() {
            $scope.status = 'Role could not be updated';
          });
        }

        // A confirmation message before updating role
        $scope.updateRoleBtn = function(event) {
          Utils.dialog('Warning: Update Document, ' +
            $scope.role + '?',
            'Are you sure you want to update, ' +
            $scope.role + '?',
            event, updateRole
          );
        };

        // deleting a role
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

        /**
         * USERS count
         */
        $scope.userDocCount = function() {
          // document count
          for (var i = 0, n = $scope.documents.length; i < n; i++) {
            $scope.docCount = 0;
            for (var j = 0, m = $scope.users.length; j < m; j++) {
              if ($scope.documents[i].ownerId === $scope.users[j]._id) {
                $scope.docCount++;
              }
              $scope.users[j].docCount = $scope.docCount;
              $log.warn($scope.users[j]);

            }
          }
        };
        // TODO: USER and the documents they created
          // Get the user details and the number of documents they created
      var initUsers = function() {
        Users.getDocCount(function(err, res) {
          if (!err) {
            var docsNo = res;
            Users.query(function(users) {
              $scope.users = users;
              for (var i = 0, l = $scope.users.length; i < l; i++) {
                for (var j = 0, n = docsNo.length; j < n; j++) {
                  if (docsNo[j]._id === $scope.users[i]._id) {
                    $scope.users[i].docs = docsNo[j].count;
                  }
                }
              }
              $scope.users = $scope.users.map(function(value) {
                if (!value.docs) {
                  value.docs = 0;
                }
                return value;
              });
            });
          }
        });
      }; /// end of count function



        $log.warn($scope.userDocCount(), 'doc count');
      }

    ]);
})();