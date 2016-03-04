(function() {
  'use strict';

  describe('UserAcountCtrl tests', function() {
    var scope,
      controller,
      state,
      Auth,
      Utils,
      mdDialog,
      Roles = {
        query: function(cb) {
          cb([1, 2, 3]);
        }
      },
      Users = {
        login: function(user, cb) {
          cb(!user, {
            user: {
              name: 3,
              email: 'great',
              _id: 1
            }
          });
        },
        save: function(user, cb, cbb) {
          var res = {user:{name: 'Abiodun', email: '1'}, name: 'Abiodun', token: '12345'};
          if (user) {
            cb(res);
          }
          cbb({
            err: {
              status: 406
            }
          });
        }
      };

    beforeEach(function() {
      module('docKip');
    });

    beforeEach(inject(function($injector) {
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope');
      controller = $controller('UserAccountCtrl', {
        $scope: scope,
        Users: Users,
        Roles: Roles
      });
      Auth = $injector.get('Auth');
      state = $injector.get('$state');
      Utils = $injector.get('Utils');
      mdDialog = $injector.get('$mdDialog');
    }));

    it('should assset that scope.cancel is a function', function(){
      spyOn(mdDialog, 'cancel');
      scope.cancel();
      expect(mdDialog.cancel).toHaveBeenCalled();
    });

    it('should assset that scope.hide is a function', function() {
      spyOn(mdDialog, 'hide');
      scope.hide();
      expect(mdDialog.hide).toHaveBeenCalled();
    });

    it('should assset that scope.signup is a function', function() {
      expect(typeof scope.signup).toBe('function');
    });

    it('should assset that scope.login is a function', function() {
      expect(typeof scope.login).toBe('function');
    });

    it('should call query on roles', function() {
      spyOn(Roles, 'query').and.callThrough();
      scope.init();
      expect(scope.roles).toEqual([2, 3]);
      expect(scope.roles).toBeDefined();
    });

    it('should call the save function on signup', function() {
      spyOn(Users, 'save').and.callThrough();
      spyOn(Auth, 'setToken').and.callThrough();
      spyOn(state, 'go').and.callThrough();
      spyOn(mdDialog, 'cancel');
      spyOn(Utils, 'toast');
      scope.user = {
        firstName: 'Abu',
        lastName: 'lulu',
        userName: 'LuluAbu',
        email: 'abulul@gmail.com',
        role: 'Trainer',
        password: 'Bummerick',
        confirmPassword: 'Bummerick'
      };
      scope.createUser();
      expect(Users.save).toHaveBeenCalled();
      expect(Auth.setToken).toHaveBeenCalled();
      expect(state.go).toHaveBeenCalled();
      expect(scope.loggedInUser).toBeDefined();
      expect(mdDialog.cancel).toHaveBeenCalled();
      expect(Utils.toast).toHaveBeenCalled();
    });

    it('should call the save function unsuccesfully', function() {
      spyOn(Users, 'save').and.callThrough();
      spyOn(Auth, 'setToken');
      spyOn(state, 'go');
      scope.user = null;
      scope.createUser();
      expect(Users.save).toHaveBeenCalled();
      expect(Auth.setToken).not.toHaveBeenCalled();
      expect(state.go).not.toHaveBeenCalled();
      expect(scope.loggedInUser).not.toBeDefined();
      expect(scope.loggedInUser).not.toBeDefined();
      expect(Utils.toast).not.toHaveBeenCalled();
    });

    it('should call login function on loginUser', function() {
      spyOn(Users, 'login').and.callThrough();
      spyOn(mdDialog, 'cancel');
      spyOn(Auth, 'setToken');
      spyOn(state, 'go');
      spyOn(Utils, 'toast');
      scope.user = true;
      scope.userLogin();
      expect(Users.login).toBeDefined();
      expect(Users.login).toHaveBeenCalled();
      expect(Auth.setToken).toHaveBeenCalled();
      expect(state.go).toHaveBeenCalled();
      expect(scope.loggedInUser).toBeDefined();
      expect(Utils.toast).toHaveBeenCalled();
      expect(mdDialog.cancel).toHaveBeenCalled();
    });

    it('should call login function unsuccesfully', function() {
      spyOn(Users, 'login').and.callThrough();
      spyOn(Auth, 'setToken');
      spyOn(state, 'go');
      spyOn(Utils, 'toast');
      scope.user = null;
      scope.userLogin();
      expect(Users.login).toBeDefined();
      expect(Users.login).toHaveBeenCalled();
      expect(Auth.setToken).not.toHaveBeenCalled();
      expect(state.go).not.toHaveBeenCalled();
      expect(scope.loggedInUser).not.toBeDefined();
      expect(Utils.toast).not.toHaveBeenCalled();
    });
  });
})();