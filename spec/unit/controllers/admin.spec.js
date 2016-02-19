(function() {
  'use strict';

  describe('AdminCtrl Tests', function() {
    var controller,
      scope,
      state,
      Utils,
      stateParams,
      httpBackend,
      Users = {
        query: function(cb) {
          cb([1, 2, 3]);
        }
      },
      Documents = {
        query: function(cb) {
          cb([1, 2, 3]);
        }
      },
      Roles = {
        query: function(cb) {
          cb([1, 2, 4]);
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

      httpBackend.when('GET', '/api/users/userInSession').respond(200, {
        user: {
          userName: 'rowlandigwe',
          email: 'great@email.com',
          token: 'test token'
        }
      });

      httpBackend.when('GET', 'views/home.html').respond(200, {
        res: 'yes'
      })
      //   $mdDialog = $injector.get('$mdDialog');
      // $mdSidenav = $injector.get('$mdSidenav');
      // $mdMedia = $injector.get('$mdMedia');

      // Roles = $injector.get('Roles');
      // Utils = $injector.get('Utils');
      // Documents = $injector.get('Documents');
    }));

    it('should call init function', function() {
      spyOn(Users, 'query').and.callThrough();
      spyOn(Roles, 'query').and.callThrough();
      spyOn(Documents, 'query').and.callThrough();
      expect(scope.init).toBeDefined();
      scope.init();
      expect(Users.query).toHaveBeenCalled();
      expect(scope.users).toBeDefined();
      expect(scope.users).toEqual([1, 2, 3]);
      expect(Roles.query).toHaveBeenCalled();
      expect(scope.roles).toBeDefined();
      expect(scope.roles).toEqual([1, 2, 4]);
      expect(Documents.query).toHaveBeenCalled();
      expect(scope.documents).toBeDefined();
      expect(scope.documents).toEqual([1, 2, 3]);
    });

    it('should test that $scope.deleteUserBtn and deleteUserFn is defined',
      function() {
        scope.user = {
          _id: 1,
          userName: 'Dotun'
        }
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
        Users.remove.args[0][1]();
        expect(Utils.toast.called).toBe(true);
      });

     it('should test that $scope.deleteUserBtn and deleteUserFn and fail',
      function() {
        scope.user = {
          _id: null,
          userName: 'Dotun'
        }
        expect(scope.deleteUserBtn).toBeDefined();
        Utils.dialog = sinon.spy();
        scope.deleteUserBtn({
          _event: 'event',
          user: scope.user
        });
        expect(Utils.dialog.called).toBe(true);
        Utils.toast = sinon.spy();
        Users.remove = sinon.spy();
        Utils.dialog.args[0][3]();
        httpBackend.flush();
        expect(Users.remove.called).toBe(true);
        Users.remove.args[0][1]();
        expect(scope.status).toBeDefined();
      });

    it('it should call user', function() {
      scope.user = {
        userName: 'Row',
        lastName: 'Igwe',
        firstName: 'Eke',
        role: 'Trainer',
        email: 'rowlandigwe@gmail.com',
        password: 'GreatWork'
      };
      expect(scope.createUserBtn).toBeDefined();




    })
  });

})();