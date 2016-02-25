(function() {
  'use strict';

  var Documents,
    httpBackend;

  describe('Documents service tests', function() {

    beforeEach(function() {
      module('docKip');
    });

    beforeEach(inject(function($injector) {
      Documents = $injector.get('Documents');
      httpBackend = $injector.get('$httpBackend');
      httpBackend.when('GET', '/api/users/userInSession')
        .respond(200, {
          res: 'res'
        });
      httpBackend.when('GET', 'views/home.html')
        .respond(200, [{
          res: 'res'
        }]);
    }));

    describe('getDocsByLimit service tests', function() {

      it('should return success response on 200 status', function() {
        httpBackend.whenGET(/\/api\/documents\/limit\/(.+)/,
          undefined, undefined, ['limit']).respond(200, {
          res: 'res'
        });
        var cb = sinon.spy();
        Documents.getDocsByLimit({
          limit: 'limit'
        }, cb);
        httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0]).toBe(null);
        expect(cb.args[0][1].res).toBe('res');
      });

      it('should return error response on 500 status', function() {
        httpBackend.when('GET', /\/api\/documents\/limit\/(.+)/,
          undefined, undefined, ['limit']).respond(500, {
          err: 'err'
        });

        var cb = sinon.spy();
        Documents.getDocsByLimit({
          limit: 'limit'
        }, cb);
        httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0].err).toBe('err');
      });
    });

    describe('getDocByRole service tests', function() {
      it('should return success response on 200 status', function() {
        httpBackend.when('GET', /\/api\/documents\/(.+)\/(.+)/,
          undefined, undefined, ['role', 'limit']).respond(200, {
          res: 'res'
        });

        var cb = sinon.spy();
        Documents.getDocsByRole({
          limit: 'limit',
        }, {
          role: 'role'
        }, cb);
        httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0]).toBe(null);
        expect(cb.args[0][1].res).toBe('res');
      });

      it('should return error response on 500 status', function() {
        httpBackend.when('GET', /\/api\/documents\/(.+)\/(.+)/,
          undefined, undefined, ['role', 'limit']).respond(500, {
          err: 'err'
        });
        var cb = sinon.spy();
        Documents.getDocsByRole({
          role: 'role'
        }, {
          limit: 'limit'
        }, cb);
        httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0].err).toBe('err');
      });
    });

    describe('getDocByDate', function() {
      it('should return success response on 200 status', function() {
        httpBackend.when('GET', /\/api\/documents\/(.+)\/(.+)/,
          undefined, undefined, ['date', 'limit']).respond(200, {
          res: 'res'
        });

        var cb = sinon.spy();
        Documents.getDocsByDate({
          limit: 'limit',
        }, {
          date: 'date'
        }, cb);
        httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0]).toBe(null);
        expect(cb.args[0][1].res).toBe('res');
      });

      it('should return error response on 500 status', function() {
        httpBackend.when('GET', /\/api\/documents\/(.+)\/(.+)/,
          undefined, undefined, ['date', 'limit']).respond(500, {
          err: 'err'
        });
        var cb = sinon.spy();
        Documents.getDocsByDate({
          date: 'date'
        }, {
          limit: 'limit'
        }, cb);
        httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0].err).toBe('err');
      });
    });
  });
})();