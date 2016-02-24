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

      httpBackend.when('GET', '/api/documents').respond(200, [{
        res: 'res'
      }]);
    }));

    describe('getDocsByLimit service tests', function() {

      it('should return success response on 200 status', function() {
        httpBackend.whenPOST(/\/api\/documents\/limit\/(.+)/,
          undefined, undefined, ['limit']).respond(200, {
          res: 'res'
        });
        var cb = sinon.spy();
        Documents.getDocsByLimit({
          limit: 'limit'
        }, cb);
        expect(Documents.getDocsByLimit.called).toBe(true);
        expect(cb.args[0][0]).toBe(null);
        expect(cb.args[0][1].res).toBe('res');
      });

      it('should return error response on 500 status', function() {
        httpBackend.when('GET', /\/api\/documents/,
          undefined, undefined, ['id']).respond(500, [{
          err: 'err'
        }]);

        var cb = sinon.spy();
        Documents.getDocsByLimit({
          limit: 1
        }, cb);
        expect(Documents.getDocsByLimit.called).toBe(true);
        expect(cb.args[0][0]).toBe(null);
        expect(cb.args[0][1].err).toBe('err');
      });
    });

    describe('getDocByRole service tests', function() {
      it('should return success response on 200 status', function() {
        httpBackend.when('GET', /\/api\/documents/,
          undefined, undefined, ['id']).respond(200, [{
          res: 'res'
        }]);

        var cb = sinon.spy();
        Documents.getDocsByLimit({
          limit: 1
        }, cb);
        expect(Documents.getDOcsByLimit.called).toBe(true);
        expect(cb.args[0][0]).toBe(null);
        expect(cb.args[0][1].res).toBe('res');
      });

      it('should return error response on 500 status', function() {
        httpBackend.when('GET', '/api/documents/').respond(500, [{
          err: 'err'
        }]);

        var cb = sinon.spy();
        Documents.getDocsByLimit({
          limit: 1
        }, cb);
        expect(Documents.getDOcsByLimit.called).toBe(true);
        expect(cb.args[0][0]).toBe(null);
        expect(cb.args[0][1].err).toBe('err');
      });
    });

  });

})();