(function() {
  'use strict';

  describe('HeadCtrl tests', function() {

    var scope,
      controller,
      nav,
      mdSidenav = function(direction) {
        return {
          toggle: function() {
            nav = direction;
          }
        };
      },
      Users = {
        logout: function(cb) {
          if (scope.loggedInUser) {
            cb(null, true);
          } else {
            cb(true, null);
          }
        }
      },
      state,
      route,
      Auth;

    beforeEach(function() {
      module('docKip');
    });

    beforeEach(inject(function($injector) {
      var $controller = $injector.get('$controller');
      scope = $injector.get('$rootScope');
      controller = $controller('HeadCtrl', {
        $scope: scope,
        Users: Users,
        $mdSidenav: mdSidenav
      });
      Auth = $injector.get('Auth');
      state = $injector.get('$state');
      route = $injector.get('$route');
    }));

    it('should define and call Users.logout', function() {
      scope.loggedInUser = 1;
      spyOn(Users, 'logout').and.callThrough();
      spyOn(Auth, 'logout').and.callThrough();
      spyOn(state, 'go').and.callThrough();
      spyOn(scope, 'loggedIn').and.callThrough();
      spyOn(route, 'reload').and.callThrough();
      scope.logoutUser();
      expect(Users.logout).toHaveBeenCalled();
      expect(Auth.logout).toHaveBeenCalled();
      expect(state.go).toHaveBeenCalled();
      expect(scope.loggedIn).toBeTruthy();
      expect(route.reload).toHaveBeenCalled();
    });

    it('should define and call Users.logout', function() {
      scope.loggedInUser = null;
      spyOn(Users, 'logout').and.callThrough();
      spyOn(Auth, 'logout').and.callThrough();
      spyOn(state, 'go').and.callThrough();
      spyOn(scope, 'loggedIn').and.callThrough();
      spyOn(route, 'reload').and.callThrough();
      scope.logoutUser();
      expect(Users.logout).toHaveBeenCalled();
      expect(Auth.logout).not.toHaveBeenCalled();
      expect(state.go).not.toHaveBeenCalled();
      expect(route.reload).not.toHaveBeenCalled();
      expect(scope.loggedIn).toBeTruthy();
    });

    it('should call toggleList function', function() {
      scope.toggleList();
      expect(nav).toEqual('left');
    });
  });
})();