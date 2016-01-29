(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('HeadCtrl', ['$rootScope', '$scope', 'Auth', 'Users', '$state',
      function($rootScope, $scope, Auth, Users, $state) {
        $scope.logout = function() {
          Users.logout(function(err, res) {
            if (err) {
              return err;
            } else {
              delete $rootScope.loggedInUser;
              Auth.logout()
                .success(function() {
                  $state.go('login');
                });
            }
          });
        };
        $scope.test = function(){
          Users.getUserDocs({id: '56ab4c4ac82a87191caad0f2'}, function  (err, docs) {
            $scope.docs = docs || err;
          })
        }
        // check that the user is logged in
        $scope.loggedIn = Auth.isLoggedIn();
        // ToDO: Details of logged in user

      }
    ]);
})();