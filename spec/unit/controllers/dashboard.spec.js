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
        getUserDocs: function(id, limit, page, cb) {
          cb(null, ['Novels', 'Ado', 'Poets']);
        },
        get: function(id, cb, cbb){
          var user;
          cb(null, user);
          cbb();
        }
      },
      Documents = {
        getAllDocs: function(limit, page, cb) {
          cb(null, [1, 2, 3]);
        },
        userDocCount: function(id, cb) {
          cb(null, [5]);
        },
        allDocCount: function(cb) {
           cb(null, [5]);
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
      stateParams = {
        id: 1
      };
      scope.param = {
        limit: 3,
        page: 1
      };
    });

    it('should call init function and resolve', function() {

      spyOn(Users, 'getUserDocs').and.callThrough();
      spyOn(Users, 'get').and.callThrough();
      spyOn(Documents, 'getAllDocs').and.callThrough();
      spyOn(Documents, 'userDocCount');
      spyOn(Documents, 'allDocCount');
      expect(scope.init).toBeDefined();
      scope.init(scope.param);
      expect(scope.documents).toBeDefined();
      expect(Documents.getAllDocs).toHaveBeenCalled();
      expect(scope.documents).toEqual([1, 2, 3]);
      expect(scope.user).toBeDefined();
      expect(Users.getUserDocs).toHaveBeenCalled();
      expect(Users.get).toHaveBeenCalled();
      expect(scope.allDocCount).toEqual([5]);
      expect(scope.docCount).toEqual([5]);
      expect(scope.userDocs).toBeDefined();
      expect(scope.userDocs).toEqual(['Novels', 'Ado', 'Poets']);
    });

    it('should load anotheer page', function(){
        scope.nextPage();
        expect(scope.param.page).toEqual(2);
    });

    it('should load previous page', function(){
      scope.previousPage();
      expect(scope.param.page).toEqual(0);
    });

    it('should disable next page button', function(){
       scope.allDocCount = 4;
      spyOn(scope, 'numberOfPages').and.callThrough();
      expect(scope.disableNextPage()).toBe(false);
    });

    it('should disable previous page button', function(){
      spyOn(scope, 'numberOfPages').and.callThrough();
      expect(scope.disablePreviousPage()).toBe(true);
    });

    it('should call numberOfPages', function(){
       scope.allDocCount = 4;
       expect(scope.numberOfPages()).toEqual(2);
    });

    it('should call isAdmin function and be truthy', function() {
      scope.loggedInUser = {
        role: 'SuperAdmin',
        userName: 'BuddyMaster'
      };
      var isAdmin = scope.isAdmin();
      expect(isAdmin).toBeTruthy();
    });

    it('should call isAdmin function and be falsy', function() {
      scope.loggedInUser = {
        role: 'SuperAdmin',
        userName: 'Job'
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