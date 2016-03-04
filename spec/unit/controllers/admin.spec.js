(function() {
  'use strict';

  describe('AdminCtrl Tests', function() {
    var controller,
      scope,
      state,
      Utils,
      stateParams = {
        id: 1
      },
      httpBackend,
      Users = {
        query: function(cb) {
          cb([1, 2, 3]);
        },
        save: function(user, cb, cbb) {
          if (user) {
            cb(user);
          }
          cbb();
        },
        get: function(id, cb, cbb) {
          var user;
          cb(null, user);
          cbb();
        }
      },
      Documents = {
        getAllDocs: function(limit, page, cb) {
          cb(null, [1, 2, 3]);
        }
      },
      Roles = {
        query: function(cb) {
          cb([1, 2, 4]);
        },
        save: function(role, cb, cbb) {
          if (role) {
            cb(role);
          }
          cbb();
        }
      };

    beforeEach(function() {
      module('docKip');
    });

    beforeEach(inject(function($injector) {
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope');
      controller = $controller('AdminCtrl', {
        $scope: scope,
        $stateParams: stateParams,
        Documents: Documents,
        Users: Users,
        Roles: Roles
      });

      Utils = $injector.get('Utils');
      state = $injector.get('$state');
      httpBackend = $injector.get('$httpBackend');

      httpBackend.when('GET', '/api/users/session').respond(200, {
        user: {
          userName: 'rowlandigwe',
          email: 'great@email.com',
          token: 'test token'
        }
      });

      httpBackend.when('GET', 'views/home.html').respond(200, {
        res: 'yes'
      });

      httpBackend.when('GET', 'views/404.html').respond(200, [{
        res: 'res'
      }]);
    }));

    it('should call init function', function() {
      spyOn(Users, 'query').and.callThrough();
      spyOn(Roles, 'query').and.callThrough();
      spyOn(Documents, 'getAllDocs').and.callThrough();
      expect(scope.init).toBeDefined();
      scope.init();
      expect(Users.query).toHaveBeenCalled();
      expect(scope.users).toBeDefined();
      expect(scope.users).toEqual([1, 2, 3]);
      expect(Roles.query).toHaveBeenCalled();
      expect(scope.roles).toBeDefined();
      expect(scope.roles).toEqual([1, 2, 4]);
      expect(Documents.getAllDocs).toHaveBeenCalled();
      expect(scope.documents).toBeDefined();
      expect(scope.documents).toEqual([1, 2, 3]);
    });

    it('should call scope.createUserBtn', function() {
      spyOn(Users, 'save').and.callThrough();
      spyOn(Utils, 'toast').and.callThrough();
      scope.newUser = {
        userName: 'Row',
        lastName: 'Igwe',
        firstName: 'Eke',
        role: 'Trainer',
        email: 'rowlandigwe@gmail.com',
        password: 'GreatWork'
      };
      scope.createUserBtn();
      expect(Users.save).toHaveBeenCalled();
      expect(Utils.toast).toHaveBeenCalledWith('A new user has been created');
    });

    it('should test that $scope.deleteUserBtn and deleteUserFn is defined',
      function() {
        scope.user = {
          _id: 1,
          userName: 'Dotun'
        };
        expect(scope.deleteUserBtn).toBeDefined();
        Utils.dialog = sinon.spy();
        scope.deleteUserBtn({
          _event: 'event'
        }, {
          user: scope.user
        });
        expect(Utils.dialog.called).toBe(true);
        Utils.toast = sinon.spy();
        Users.remove = sinon.spy();
        Utils.dialog.args[0][3]();
        httpBackend.flush();
        expect(Users.remove.called).toBe(true);
        Users.remove.args[0][1]('res');
      });

    it('should call $scope.deleteUserBtn and deleteUserFn and fail',
      function() {
        scope.user = {
          _id: '',
          userName: 'Great'
        };
        expect(scope.deleteUserBtn).toBeDefined();
        Utils.dialog = sinon.spy();
        scope.deleteUserBtn({
          _event: 'event'
        }, {
          user: scope.user
        });
        expect(Utils.dialog.called).toBe(true);
        Utils.toast = sinon.spy();
        Users.remove = sinon.spy();
        Utils.dialog.args[0][3]();
        httpBackend.flush();
        expect(Users.remove.called).toBe(true);
        Users.remove.args[0][1]('res');
      });

    it('should call scope.createRoleBtn', function() {
      scope.newRole = {
        title: 'Trainer'
      };
      spyOn(Roles, 'save').and.callThrough();
      spyOn(Utils, 'toast').and.callThrough();
      scope.createRoleBtn();
      expect(Roles.save).toHaveBeenCalled();
      expect(Utils.toast).toHaveBeenCalledWith('Role created');
    });

    it('should call scope.createRoleBtn and fail', function() {
      scope.role = '';
      spyOn(Roles, 'save').and.callThrough();
      spyOn(Utils, 'toast').and.callThrough();
      scope.createRoleBtn();
      expect(Roles.save).toHaveBeenCalled();
      expect(Utils.toast).toHaveBeenCalledWith('Can not create role');
      expect(scope.status).toBeDefined();
    });

    it('should test that $scope.deleteRoleBtn and deleteRoleFn is defined',
      function() {
        scope.role = {
          id: 1,
          title: 'Librarian'
        };
        expect(scope.deleteRoleBtn).toBeDefined();
        Utils.dialog = sinon.spy();
        scope.deleteRoleBtn({
          _event: 'event'
        }, {
          role: scope.role
        });
        expect(Utils.dialog.called).toBe(true);
        Utils.toast = sinon.spy();
        state.reload = sinon.spy();
        Roles.remove = sinon.spy();
        Utils.dialog.args[0][3]();
        httpBackend.flush();
        expect(Roles.remove.called).toBe(true);
        Roles.remove.args[0][1]('res');
        expect(Utils.toast.called).toBe(true);
      });

    it('should unsuccessfully call $scope.deleteRoleBtn and deleteRoleFn',
      function() {
        scope.role = {
          id: '',
          title: 'Librarian'
        };
        expect(scope.deleteRoleBtn).toBeDefined();
        Utils.dialog = sinon.spy();
        scope.deleteRoleBtn({
          _event: 'event'
        }, {
          role: scope.role
        });
        expect(Utils.dialog.called).toBe(true);
        Utils.toast = sinon.spy();
        Roles.remove = sinon.spy();
        Utils.dialog.args[0][3]();
        httpBackend.flush();
        expect(Roles.remove.called).toBe(true);
        Roles.remove.args[0][1]('res');
        expect(Utils.toast.called).toBe(true);
      });

    it('should call scope.deleteDocBtn and deleteDoc function', function() {
      scope.doc = {
        _id: '1',
        title: 'test title'
      };

      expect(scope.deleteDocBtn).toBeDefined();
      Utils.dialog = sinon.spy();
      scope.deleteDocBtn({
        _event: 'event'
      }, {
        doc: scope.doc
      });
      expect(Utils.dialog.called).toBe(true);
      Utils.toast = sinon.spy();
      state.reload = sinon.spy();
      Documents.remove = sinon.spy();
      Utils.dialog.args[0][3]();
      httpBackend.flush();
      expect(Documents.remove.called).toBe(true);
      Documents.remove.args[0][1]('res');
      expect(Utils.toast.called).toBe(true);
    });

    it('should unsuccessfully call scope.deleteDocBtn and deleteDoc function', function() {
      scope.doc = {
        _id: null,
        title: 'test title2'
      };
      expect(scope.deleteDocBtn).toBeDefined();
      Utils.dialog = sinon.spy();
      scope.deleteDocBtn({
        _event: 'event'
      }, {
        doc: scope.doc
      });
      expect(Utils.dialog.called).toBe(true);
      Utils.toast = sinon.spy();
      Documents.remove = sinon.spy();
      Utils.dialog.args[0][3]();
      httpBackend.flush();
      expect(Documents.remove.called).toBe(true);
      Documents.remove.args[0][1]('res');
      expect(Utils.toast.called).toBe(true);
    });
  });
})();