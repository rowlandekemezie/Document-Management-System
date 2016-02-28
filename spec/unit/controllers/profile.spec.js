(function() {
  'use strict';

  describe('Tests for EditProfileCtrl', function() {

    var controller,
      scope,
      Utils,
      state,
      Users = {
        update: function(user, cb) {
          if (user) {
            cb(user);
          } else {
            cb({
              err: 'Can not update'
            });
          }
        }
      },
      Roles = {
        query: function(cb) {
          cb([1, 2, 3]);
        }
      },
      $rootScope,
      loggedInUser = {
        userName: 'Maryam',
        firstName: 'Lawrence',
        lastName: 'Emmanuel',
        email: 'dotunrowland@gmail.com',
        password: 'myPassword',
        role: 'Trainer'
      };

    beforeEach(function() {
      module('docKip');
    });

    beforeEach(function() {
      inject(function($injector) {
        var $controller = $injector.get('$controller');
        scope = $injector.get('$rootScope');
        $rootScope = $injector.get('$rootScope');
        $rootScope.loggedInUser = loggedInUser;
        controller = $controller('EditProfileCtrl', {
          $scope: scope,
          Roles: Roles,
          Users: Users
        });
        Utils = $injector.get('Utils');
        state = $injector.get('$state');
      });
      inject(function(_$rootScope_) {
        $rootScope = _$rootScope_;
      });
    });

    it('should call query on roles service', function() {
      spyOn(Roles, 'query').and.callThrough();
      scope.init();
      expect(Roles.query).toHaveBeenCalled();
      expect(scope.roles).toBeTruthy();
      expect(scope.roles).toEqual([2, 3]);
      expect(scope.roles.length).toBe(2);
      expect(scope.roles instanceof Array).toBe(true);
    });

    it('should call update on users service', function() {
      spyOn(Users, 'update').and.callThrough();
      spyOn(state, 'go');
      spyOn(Utils, 'toast');
      scope.editProfile();
      expect(Users.update).toHaveBeenCalled();
      expect(Utils.toast).toHaveBeenCalled();
      expect(state.go).toHaveBeenCalled();
    });
  });
})();