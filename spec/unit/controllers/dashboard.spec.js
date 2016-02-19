(function() {
  'use strict';

  describe('DashboardCtrl tests', function() {
    var scope,
      controller,
      Utils,
      state,
      nav,
      mdSidenav = function(direction) {
        return {
          toggle: function() {
            nav = direction;
          }
        };
      },
      stateParams = {
        id: ''
      },
      Users = {
        query: function(cb) {
          cb(['Abu', 'Emy', 'Chy']);
        },
        getUserDocs: function(id, cb, cbb) {
          cb(['Novels', 'Ado', 'Poets']);
          cbb({
            err: {
              status: 404
            }
          });
        },
      },
      Documents = {
        query: function(cb) {
          cb([1, 2, 3]);
        }
      };

    beforeEach(function() {
      module('docKip');
    });

    beforeEach(function() {
      inject(function($injector) {
        var $controller = $injector.get('$controller');
        scope = $injector.get('$rootScope');
        Utils = $injector.get('Utils');
        state = $injector.get('$state');
        controller = $controller('DashboardCtrl', {
          $scope: scope,
          Users: Users,
          Documents: Documents,
          $stateParams: stateParams,
          $mdSidenav: mdSidenav
        });
      });
    });

    it('should call init function and resolve', function() {
      stateParams = {
        id: 1
      };
      spyOn(Users, 'query').and.callThrough();
      spyOn(Users, 'getUserDocs').and.callThrough();
      spyOn(Documents, 'query').and.callThrough();
      expect(scope.init).toBeDefined();
      scope.init();
      expect(scope.documents).toBeDefined();
      expect(Documents.query).toHaveBeenCalled();
      expect(scope.documents).toEqual([1, 2, 3]);
      expect(scope.users).toBeDefined();
      expect(Users.query).toHaveBeenCalled();
      expect(scope.users).toEqual(['Abu', 'Emy', 'Chy']);
      expect(Users.getUserDocs).toHaveBeenCalled();
      expect(scope.userDocs).toBeDefined();
      expect(scope.userDocs).toEqual(['Novels', 'Ado', 'Poets']);
    });

    it('should call getUserDocs function and return nothing', function() {
      stateParams = {
        id: null
      };
      spyOn(Users, 'query').and.callThrough();
      spyOn(Users, 'getUserDocs').and.callThrough();
      spyOn(Documents, 'query').and.callThrough();
      expect(scope.init).toBeDefined();
      scope.init();
      expect(scope.documents).toBeDefined();
      expect(Documents.query).toHaveBeenCalled();
      expect(scope.documents).toEqual([1, 2, 3]);
      expect(scope.users).toBeDefined();
      expect(Users.query).toHaveBeenCalled();
      expect(scope.users).toEqual(['Abu', 'Emy', 'Chy']);
      expect(Users.getUserDocs).toHaveBeenCalled();
      expect(scope.userDocs).not.toBeDefined();
      expect(scope.message).toBeDefined();
    });

    it('should call getName function', function() {
      scope.users[0] = {
        _id: 1,
        userName: 'Trainer'
      };
      var nameConverter = scope.getName(1);
      expect(nameConverter).toBeTruthy();
    });

    it('should call getName function and fail', function() {
      scope.users[0] = {
        _id: 1,
        userName: 'Trainer'
      };
      var nameConverter = scope.getName(2);
      expect(nameConverter).toBeFalsy();
    });

    it('should call authview function', function() {
      scope.loggedInUser = {
        role: 'SuperAdmin'
      };
      var isAdmin = scope.isAdmin();
      expect(isAdmin).toBeTruthy();
    });

    it('should call authview function', function() {
      scope.loggedInUser = {
        role: 'Trainer'
      };
      var isAdmin = scope.isAdmin();
      expect(isAdmin).toBeFalsy();
    });

    it('should call toggleList function', function() {
      scope.toggleList();
      expect(nav).toEqual('left');
    });
  });
})();