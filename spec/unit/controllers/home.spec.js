(function() {
  'use strict';

  describe('HomeCtrl tests', function() {

    var mdDialog, scope, controller;

    beforeEach(function() {
      module('docKip');
    });

    beforeEach(inject(function($injector) {
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope');
      mdDialog = $injector.get('$mdDialog');
      controller = $controller('HomeCtrl', {
        $scope: scope,
        $mdDialog: mdDialog
      });
    }));

    it('should assert that scope.signUp is a function', function() {
      expect(typeof scope.signUp).toBe('function');
    });

    it('should assert that scope.signup calls mdDialog', function() {
      spyOn(mdDialog, 'show').and.callThrough();
      expect(mdDialog.show).toBeDefined();
      expect(typeof mdDialog.show).toBe('function');
      scope.signUp({
        ev: 'ev'
      });
      expect(mdDialog.show).toHaveBeenCalled();
    });

    it('should assert that scope.loginUser is a function', function() {
      expect(typeof scope.loginUser).toBe('function');
    });

    it('should assert that scope.login calls mdDialog', function() {
      spyOn(mdDialog, 'show').and.callThrough();
      expect(mdDialog.show).toBeDefined();
      expect(typeof mdDialog.show).toBe('function');
      scope.loginUser({
        ev: 'ev'
      });
      expect(mdDialog.show).toHaveBeenCalled();
    });

    it('should assert signInUser to be a function', function() {
      spyOn(scope, 'loginUser');
      scope.signInUser({
        ev: 'ev'
      });
      expect(scope.loginUser).toHaveBeenCalled();
    });
  });
})();