(function() {
  'use strict';

  describe('Users service test', function() {
    var Users,
      http,
      scope,
      httpBackend;

    beforeEach(function() {
      module('docKip');
    });

    beforeEach(inject(function($injector) {
      httpBackend = $injector.get('$httpBackend');
      scope = $injector.get('$rootScope');
      httpBackend.when('GET', '/api/users/session')
        .respond(200, {
          res: 'res'
        });

      httpBackend.when('GET', 'views/home.html')
        .respond(200, [{
          res: 'res'
        }]);

      httpBackend.when('GET', 'views/404.html')
        .respond(200, [{
          res: 'res'
        }]);

      http = $injector.get('$http');
      Users = $injector.get('Users');
    }));

    describe('Users login tests', function() {
      it('should call login function', function() {
        expect(Users.login).toBeDefined();
        expect(typeof Users.login).toBe('function');
      });

      it('should return status 200 on success', function() {
        httpBackend.when('POST', '/api/users/login')
          .respond(200, {
            res: 'res'
          });
        var cb = sinon.spy();
        Users.login({
          user: 'user'
        }, cb);
        httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0]).toBe(null);
        expect(cb.args[0][1].res).toBe('res');
      });

      it('should return error on status 500', function() {
        httpBackend.when('POST', '/api/users/login')
          .respond(500, {
            err: 'err'
          });
        var cb = sinon.spy();
        Users.login({
          user: 'user'
        }, cb);
        httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0].data.err).toBe('err');
      });
    });

    describe('Users session tests', function() {
      it('should define session function', function() {
        expect(Users.getUser).toBeDefined();
        expect(typeof Users.getUser).toBe('function');
      });

      it('should return user in session on http success', function() {
        var cb = sinon.spy();
        Users.getUser(cb);
        httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0]).toBe(null);
        expect(cb.args[0][1].data.res).toBe('res');
      });
    });

    describe('User logout tests', function() {

      it('should define and call  logout function', function() {
        expect(Users.logout).toBeDefined();
        expect(typeof Users.logout).toBe('function');
      });

      it('should call http success function on status 200', function() {
        httpBackend.when('GET', '/api/users/logout')
          .respond(200, {
            res: 'res'
          });
        var cb = sinon.spy();
        Users.logout(cb);
        httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0]).toBe(null);
        expect(cb.args[0][1].res).toBe('res');
      });

      it('should call erro function status 500', function() {
        httpBackend.when('GET', '/api/users/logout')
          .respond(500, {
            err: 'err'
          });
        var cb = sinon.spy();
        Users.logout(cb);
        httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0].data.err).toBe('err');
      });
    });

    describe('Users.getUserDocs tests', function() {
      it('should define and call getUseDocs function', function() {
        expect(Users.getUserDocs).toBeDefined();
        expect(typeof Users.getUserDocs).toBe('function');
      });

      it('should return success on status 200', function() {
        httpBackend.when('GET', /\/api\/users\/(.+)\/documents\?limit=(.+)&page=(.+)/,
          undefined, undefined, ['id', 'limit', 'page'])
          .respond(200, {
            res: 'res'
          });
        var cb = sinon.spy();
        Users.getUserDocs({
          id: 'id'
        }, 10, 5, cb);
        httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0]).toBe(null);
        expect(cb.args[0][1].data.res).toBe('res');
      });

      it('should return error on status 500', function() {
        httpBackend.when('GET', /\/api\/users\/(.+)\/documents\?limit=(.+)&page=(.+)/,
          undefined, undefined, ['id', 'limit', 'page'])
          .respond(500, {
            err: 'err'
          });
        var cb = sinon.spy();
        Users.getUserDocs({
          id: 'id'
        }, 10, 5, cb);
        httpBackend.flush();
        expect(cb.called).toBe(true);
        expect(cb.args[0][0].data.err).toBe('err');
      });
    });
  });
})();