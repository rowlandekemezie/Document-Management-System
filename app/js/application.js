// angular modules
angular.module('docKip.services', []);
angular.module('docKip.controllers', []);

// require controllers
require('./controllers/login');
// require('./controllers/welcome');

// require services
require('./services/users/authService');
require('./services/users/userService');
// require('./services/documents/');
// require('./services/roles/');

angular.module('docKip', [
  'ngRoute',
  'ngResource',
  'ngMaterial',
  'ui.router',
  'ngAnimate',
'docKip.services',
'docKip.controllers'
])
  .config(['$locationProvider',
    '$stateProvider',
    '$mdThemingProvider',

    function($locationProvider, $stateProvider, $mdThemingProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'views/home.html',
          // controller: 'WelcomeCtrl'
        })
        .state('users', {
          url: '/users',
          templateUrl: 'views/users/users-all.html',
          controller: 'userCtrl'
        })
        .state('addUser', {
          url: '/users/create',
          templateUrl: 'views/users/users.html',
          controller: 'userCtrl'
        })
        .state('editUser', {
          url: '/users/{id}/edit',
          templateUrl: 'views/users/all.html',
          controller: 'userCtrl'
        })
        .state('login', {
          url: '/users/login',
          templateUrl: 'views/user-dashboard.html',
          controller: 'loginCtrl'
        });
      // Now set up the states
      $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('red');
      $locationProvider.html5Mode(true);
    }
  ]);
// .run(function($scope) {
//   $state.go('home')
// });