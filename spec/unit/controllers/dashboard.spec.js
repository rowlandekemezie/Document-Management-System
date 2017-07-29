(function() {
  'use strict';

  describe('DashboardCtrl tests', function() {
    var scope,
      controller,
      Utils,
      state,
      stateParams = {
        id: ''
      },
      Users = {
        getUserDocs: function(id, limit, page, cb) {
          cb(null, {data: ['Novels', 'Ado', 'Poets']});
        },
        get: function(id, cb, cbb) {
          var user;
          cb(null, user);
          cbb();
        }
      },
      Documents = {
        getAllDocs: function(limit, page, cb) {
          cb(null, {data: [1, 2, 3]});
        },
        userDocCount: function(id, cb) {
          cb(null, [5]);
        },
        allDocCount: function(cb) {
          cb(null, [5]);
        }
      },
      loggedInUser = {
        _id: 1,
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
        Utils = $injector.get('Utils');
        state = $injector.get('$state');
        controller = $controller('DashboardCtrl', {
          $scope: scope,
          Users: Users,
          Documents: Documents,
          $stateParams: stateParams
        });
      });
      scope.loggedInUser = loggedInUser;
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
      spyOn(Documents, 'userDocCount').and.callThrough();
      spyOn(Documents, 'allDocCount').and.callThrough();
      expect(scope.init).toBeDefined();
      scope.init(scope.param);
      expect(scope.documents).toBeDefined();
      expect(Documents.getAllDocs).toHaveBeenCalled();
      expect(scope.documents).toEqual({data: [1, 2, 3]});
      expect(scope.user).toBeDefined();
      expect(Users.getUserDocs).toHaveBeenCalled();
      expect(Users.get).toHaveBeenCalled();
      expect(scope.allDocCount).toEqual([5]);
      expect(scope.loggedInUser.docCount).toEqual([5]);
      expect(scope.userDocs).toBeDefined();
      expect(scope.userDocs).toEqual(['Novels', 'Ado', 'Poets']);
    });

    it('should load anotheer page', function() {
      scope.nextPage();
      expect(scope.param.page).toEqual(2);
    });

    it('should load previous page', function() {
      scope.previousPage();
      expect(scope.param.page).toEqual(0);
    });

    it('should disable next page button', function() {
      scope.allDocCount = 4;
      spyOn(scope, 'numberOfPages').and.callThrough();
      expect(scope.disableNextPage()).toBe(false);
    });

    it('should disable next page button for user', function() {
      scope.docCount = 4;
      spyOn(scope, 'numberOfPage').and.callThrough();
      expect(scope.disableNextPageUser()).toBe(false);
    });

    it('should disable previous page button', function() {
      spyOn(scope, 'numberOfPages').and.callThrough();
      expect(scope.disablePreviousPage()).toBe(true);
    });

    it('should call numberOfPages', function() {
      scope.allDocCount = 4;
      expect(scope.numberOfPages()).toEqual(2);
    });

    it('should call numberOfPage for user', function() {
      scope.docCount = 4;
      expect(scope.numberOfPage()).toEqual(2);
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

    it('should assign delete privilege on a document', function() {
      scope.loggedInUser = {
        role: 'SuperAdmin',
        _id: 1
      };
      scope.doc = {
        ownerId: 1
      };

      expect(scope.canDelete({
        doc: scope.doc
      })).toBeTruthy();
    });

    it('should assert that only SuperAdmin and document owner can delete a documen', function() {
      scope.loggedInUser = {
        role: 'Documentarian',
        _id: 2
      };
      scope.doc = {
        ownerId: 1
      };
      expect(scope.canDelete({
        doc: scope.doc
      })).toBeFalsy();
    });

    it('should assign edit privilege on a document', function() {
      scope.loggedInUser = {
        role: 'Documentarian',
        _id: 1
      };
      scope.doc = {
        ownerId: 2
      };
      expect(scope.canEdit({
        doc: scope.doc
      })).toBeTruthy();
    });

    it('should assert that same role has edit privilege on a document', function() {
      scope.loggedInUser = {
        role: 'Trainer',
      };
      scope.doc = {
        role: 'Trainer',
      };
      expect(scope.canEdit({
        doc: scope.doc
      })).toBeTruthy();
    });

    it('should assert that only SuperAdmin, Documentarian, and owner or same role can edit a document', function() {
      scope.loggedInUser = {
        _id: 1,
        role: 'Trainer'
      };
      scope.doc = {
        _id: 2,
        role: 'Admin'
      };
      expect(scope.canEdit({
        doc: scope.doc
      })).toBeFalsy();
    });

    it('should assert that scope.close is a function', function () {
      expect(scope.close).toBeDefined();
      expect(typeof scope.close).toBe('function');
    })
  });
})();