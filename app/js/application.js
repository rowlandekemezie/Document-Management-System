  // angular modules
  angular.module('docKip.services', []);
  angular.module('docKip.controllers', []);

  // require services
  require('./services/users/authService');
  require('./services/users/userService');
  // require('./services/documents/');
  // require('./services/roles/');

  // require controllers
  require('./controllers/users');
  require('./controllers/header');
  require('./controllers/login');



  angular.module('docKip', [
    'ngRoute',
    'ngResource',
    'ngMaterial',
    'ui.router',
    // 'ngAnimate',
    'docKip.services',
    'docKip.controllers'
  ])
  // .run(['$rooteScope', '$scope',
  //   function($rootscope, $scope) {
  //     $state.go('home');
  //   }
  // ])
  .config(['$locationProvider',
    '$stateProvider',
    '$mdThemingProvider', '$urlRouterProvider', /*'$httpProvider',*/

    function($locationProvider,
      $stateProvider,
      $mdThemingProvider,
      $urlRouterProvider) {

      // Now set up the states
      $stateProvider
        .state('404', {
          url: '/404',
          templateUrl: 'views/404.html'
        })
        .state('home', {
          url: '/',
          templateUrl: 'views/home.html',
          controller: 'HeadCtrl'
        })
        .state('users', {
          url: '/users',
          templateUrl: 'views/users/users-all.html',
          controller: 'UserCtrl'
        })
        .state('addUser', {
          url: '/users/create',
          templateUrl: 'views/users/users-all.html',
          controller: 'UserCtrl'
        })
        .state('editUser', {
          url: '/users/{id}/edit',
          templateUrl: 'views/users/users-all.html',
          controller: 'UserCtrl'
        })
        .state('login', {
          url: '/users/login',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('sign-up', {
          url: '/users/sign-up',
          templateUrl: 'views/users/sign-up.html',
          controller: 'LoginCtrl'
        })
        .state('dashboard', {
          url: '/users/dashboard',
          templateUrl: 'views/users/dashboard.html',
          controller: 'DashboadCtrl'
        });

      // when the routes are not found
      // $urlRouterProvider.otherwise('/404');

      // Theme colors
      $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('red');

      $locationProvider.html5Mode(true);
    }
  ]);