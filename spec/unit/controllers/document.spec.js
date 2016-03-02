(function() {
  'use strict';

  describe('Tests for DocumentCtrl', function() {

    var controller,
      Utils,
      scope,
      Roles = {
        query: function(cb) {
          cb([1, 2, 3]);
        }
      },
      state,
      stateParams = {
        id: 1,
        docid: 2
      },
      Users,
      loggedInUser = {
        _id: 1,
        userName: 'Maryam',
        firstName: 'Lawrence',
        lastName: 'Emmanuel',
        email: 'dotunrowland@gmail.com',
        password: 'myPassword',
        role: 'Trainer'
      },
      Documents = {
        save: function(doc, cb, cbb) {
          !doc.fail ? cb(false, doc) : cbb(true, null);
        },
        update: function(doc, cb) {
          doc ? cb(doc, null) : cb(true, null);
        },
        get: function(id, cb) {
          cb([1]);
        },
        remove: function(id, cb, cbb) {
          cb();
          cbb();
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
        controller = $controller('DocumentCtrl', {
          $scope: scope,
          Users: Users,
          Documents: Documents,
          Roles: Roles,
          $stateParams: stateParams
        });
      });
    });

    it('should return roles', function() {
      spyOn(Roles, 'query').and.callThrough();
      expect(scope.roles).toBeTruthy();
      expect(scope.roles).toEqual([2, 3]);
      expect(scope.roles.length).toBe(2);
      expect(scope.roles instanceof Array).toBe(true);
    });

    it('should define and create a document', function() {
      scope.loggedInUser = loggedInUser;
      scope.document = {
        fail: false
      };
      spyOn(Documents, 'save').and.callThrough();
      spyOn(Utils, 'toast');
      spyOn(state, 'go');
      scope.createDoc();
      expect(Documents.save).toHaveBeenCalled();
      expect(Utils.toast).toHaveBeenCalled();
      expect(state.go).toHaveBeenCalled();
    });

    it('should create a falsy document and fail', function() {
      scope.loggedInUser = loggedInUser;
      scope.document = {
        fail: true
      };
      spyOn(Documents, 'save').and.callThrough();
      spyOn(state, 'go');
      scope.createDoc();
      expect(state.go).not.toHaveBeenCalled();
      expect(scope.status).toBeDefined();
    });

    it('should get document by their Id', function() {
      spyOn(Documents, 'get').and.callThrough();
      scope.getDoc();
      expect(Documents.get).toHaveBeenCalled();
      expect(scope.docDetail).toEqual([1]);
      expect(scope.docDetail.length).toBe(1);
    });

      it('should load Util dialog for delete', function() {
      spyOn(Utils, 'dialog').and.callThrough();
      scope.getDoc();
      scope.deleteDoc({
        _event: 'event'
      });
      expect(Utils.dialog).toHaveBeenCalled();
    });

    it('should call delete function and delete document', function() {
      scope.docDetail = {
        _id: 1,
        title: 'pass'
      };
      scope.loggedInUser = loggedInUser;
      spyOn(Documents, 'remove').and.callThrough();
      spyOn(Utils, 'toast');
      scope.deleteDocFn();
      expect(Documents.remove).toHaveBeenCalled();
      expect(Utils.toast).toHaveBeenCalled();
      expect(Utils.toast).toHaveBeenCalledWith('Your document has been successfully deleted');
    });

    it('should call delete function and fail', function() {
      scope.docDetail = {
        _id: '',
        title: 'fail'
      };
      scope.loggedInUser = loggedInUser;
      spyOn(Documents, 'remove').and.callThrough();
      scope.deleteDocFn();
      expect(scope.status).toBeDefined();
    });

    it('should  Util dialog for update', function() {
      spyOn(Utils, 'dialog').and.callThrough();
      scope.getDoc();
      scope.updateDoc({
        _event: 'event'
      });
      expect(Utils.dialog).toHaveBeenCalled();
    });

    it('should call update function', function() {
      scope.docDetail = {
        _id: 1,
        title: 'test 2'
      };
      scope.loggedInUser = loggedInUser;
      spyOn(Documents, 'update').and.callThrough();
      spyOn(Utils, 'toast');
      scope.updateDocFn();
      expect(Documents.update).toHaveBeenCalled();
    });

    it('should call update function and fail', function() {
      scope.docDetail = {
        _id: '',
        title: 'great of course'
      };
      scope.loggedInUser = loggedInUser;
      spyOn(Documents, 'update').and.callThrough();
      scope.updateDocFn();
      expect(Documents.update).toHaveBeenCalled();
    });
  });
})();