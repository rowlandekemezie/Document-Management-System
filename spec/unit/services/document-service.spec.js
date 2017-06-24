(function() {
  'use strict';

  var Documents,
    httpBackend,
    http;

  describe('Documents service tests', function() {

    beforeEach(function() {
      module('docKip');
    });

    beforeEach(inject(function($injector) {
      Documents = $injector.get('Documents');
      httpBackend = $injector.get('$httpBackend');
      http = $injector.get('$http');

      httpBackend.when('GET', '/api/users/session').respond(200, [{
        res: 'res'
      }]);

      httpBackend.when('GET', 'views/home.html')
        .respond(200, [{
          res: 'res'
        }]);

      httpBackend.when('GET', 'views/404.html').respond(200, [{
        res: 'res'
      }]);
    }));

    describe('getAllDocs service tests', function() {
      it('should return success response on 200 status', function() {
        httpBackend.whenGET(/\/api\/documents\?limit=(.+)&page=(.+)/,
          undefined, undefined, ['limit', 'page']).respond(200, {
          res: 'res'
        });

        var cb = sinon.spy();
        Documents.getAllDocs(20, 4, cb);
        httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0]).toBe(null);
        expect(cb.args[0][1].res).toBe('res');
      });

      it('should return success response on 500 status', function() {
        httpBackend.whenGET(/\/api\/documents\?limit=(.+)&page=(.+)/,
          undefined, undefined, ['limit', 'page']).respond(500, {
          err: 'err'
        });

        var cb = sinon.spy();
        Documents.getAllDocs(20, 3, cb);
        httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0].data.err).toBe('err');
      });
    });

    describe('getDocByRole service tests', function() {
      it('should return success response on 200 status', function() {
        httpBackend.whenGET(/\/api\/documents\/role\/(.+)\/(.+)/, undefined,
          undefined, ['role', 'limit']).respond(200, {
          res: 'res'
        });

        var cb = sinon.spy();
        Documents.getDocsByRole(10, 10, cb);
        httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0]).toBe(null);
        expect(cb.args[0][1].res).toBe('res');
      });

    it('should return error response on 500 status', function() {
      httpBackend.when('GET', /\/api\/documents\/role\/(.+)\/(.+)/,
        undefined, undefined, ['role', 'limit']).respond(500, {
        err: 'err'
      });

      var cb = sinon.spy();
      Documents.getDocsByRole(10, 10, cb);
      httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0].data.err).toBe('err');
    });
  });

     describe('getDocByDate service tests', function() {
      it('should return success response on 200 status', function() {
        httpBackend.whenGET(/\/api\/documents\/date\/(.+)\/(.+)/, undefined,
          undefined, ['date', 'limit']).respond(200, {
          res: 'res'
        });

        var cb = sinon.spy();
        Documents.getDocsByDate(10, 10, cb);
        httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0]).toBe(null);
        expect(cb.args[0][1].res).toBe('res');
      });

    it('should return error response on 500 status', function() {
      httpBackend.when('GET', /\/api\/documents\/date\/(.+)\/(.+)/,
        undefined, undefined, ['date', 'limit']).respond(500, {
        err: 'err'
      });

      var cb = sinon.spy();
      Documents.getDocsByDate(10, 10, cb);
      httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0].data.err).toBe('err');
    });
  });

  describe('userDocCount tests', function() {
    it('should return success response on 200 status', function() {
      httpBackend.whenGET(/\/api\/documents\/getCount\/(.+)/,
        undefined, undefined, ['id']).respond(200, {
        res: 'res'
      });

      var cb = sinon.spy();
      Documents.userDocCount({
        id: 'id'
      }, cb);
      httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0]).toBe(null);
      expect(cb.args[0][1].res).toBe('res');
    });

    it('should return error response on 500 status', function() {
      httpBackend.when('GET', /\/api\/documents\/getCount\/(.+)/,
        undefined, undefined, ['id']).respond(500, {
        err: 'err'
      });

      var cb = sinon.spy();
      Documents.userDocCount({
        id: 'id'
      }, cb);
      httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0].data.err).toBe('err');
    });
  });

  describe('allDocCount tests', function() {
    it('should return success response on 200 status', function() {
      httpBackend.whenGET(/\/api\/documents\/count\/all/,
        undefined, undefined).respond(200, {
        res: 'res'
      });

      var cb = sinon.spy();
      Documents.allDocCount(cb);
      httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0]).toBe(null);
      expect(cb.args[0][1].res).toBe('res');
    });

    it('should return error response on 500 status', function() {
      httpBackend.when('GET', /\/api\/documents\/count\/all/,
        undefined, undefined).respond(500, {
        err: 'err'
      });

      var cb = sinon.spy();
      Documents.allDocCount(cb);
      httpBackend.flush();
      expect(cb.called).toBe(true);
      expect(cb.args[0][0].data.err).toBe('err');
    });
  });
});

})();