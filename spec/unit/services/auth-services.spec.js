(function() {
  'use strict';

  var Auth,
    AuthToken,
    _window,
    AuthInterceptor,
    location,
    localStorage;

  describe('Auth unit tests', function() {

    beforeEach(function() {
      module('docKip');
    });

    beforeEach(inject(function($injector) {
      Auth = $injector.get('Auth');
      AuthToken = $injector.get('AuthToken');
      location = $injector.get('$location');
      _window = $injector.get('$window');
      AuthInterceptor = $injector.get('AuthInterceptor');
      localStorage = _window.localStorage;
    }));

    it('should define and call isLoggedIn function', function() {
      expect(Auth.isLoggedIn).toBeDefined();
      expect(typeof Auth.isLoggedIn).toBe('function');
    });

    it('should return true Auth.getToken and returns true on isLoggedIn', function() {
      AuthToken.getToken = sinon.stub().returns(true);
      expect(Auth.isLoggedIn()).toBe(true);
      expect(AuthToken.getToken.called).toBe(true);
    });

    it('should return false if Auth.getToken returns false on isLoggedIn', function() {
      AuthToken.getToken = sinon.stub().returns(false);
      expect(Auth.isLoggedIn()).toBe(false);
      expect(AuthToken.getToken.called).toBe(true);
    });

    it('should define and call setToken function', function() {
      expect(Auth.setToken).toBeDefined();
      expect(typeof Auth.setToken).toBe('function');
    });

    it('should call AuthToken.setToken and return true', function() {
      AuthToken.setToken = sinon.spy();
      Auth.setToken('itsComplicated');
      expect(AuthToken.setToken.called).toBe(true);
    });

    it('should  define and call function', function() {
      expect(Auth.logout).toBeDefined();
      expect(typeof Auth.logout).toBe('function');
    });

    it('should call AuthToken.setToken on logout', function() {
      AuthToken.setToken = sinon.spy();
      Auth.logout();
      expect(AuthToken.setToken.called).toBe(true);
    });
  });

  describe('AuthToken tests', function() {
    it('should define AuthToken.getToken as a function', function() {
      expect(AuthToken.getToken).toBeDefined();
      expect(typeof AuthToken.getToken).toBe('function');
    });

    it('should define AuthToken.setToken as a function', function() {
      expect(AuthToken.setToken).toBeDefined();
      expect(typeof AuthToken.setToken).toBe('function');
    });
  });

  describe('AuthInterceptor tests', function() {

    it('should define request as a function', function() {
      expect(AuthInterceptor.request).toBeDefined();
      expect(typeof AuthInterceptor.request).toBe('function');
    });

    it('should call AuthToken.getToken and return token', function() {
      AuthToken.getToken = sinon.stub().returns('deMystery');
      expect(AuthInterceptor.request({
        headers: {
          'x-access-token': 'token'
        }
      }).headers['x-access-token']).toBe('deMystery');
      expect(AuthToken.getToken.called).toBe(true);
    });

    it('should define responseError as function', function() {
      expect(AuthInterceptor.responseError).toBeDefined();
      expect(typeof AuthInterceptor.responseError).toBe('function');
    });
  });
})();