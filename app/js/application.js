  (function() {
    'use strict';

    // angular modules
    angular.module('docKip.services', []);
    angular.module('docKip.controllers', []);

    // require services
    require('./services/users/auth-service');
    require('./services/users/user-service');
    require('./services/role-service');
    require('./services/doc-service');
    require('./services/utils');

    // require controllers
    require('./controllers/users');
    require('./controllers/header');
    require('./controllers/create-account');
    require('./controllers/login');
    require('./controllers/dashboard');
    require('./controllers/user-dialog');


    // require angular messages
    //require('angular-messages');


    angular.module('docKip', [
      'docKip.services',
      'docKip.controllers',
      'ngRoute',
      'ngResource',
      'ngMaterial',
      'ui.router',
      'ngAnimate'
      //'ngMessages'

    ])
      .run(['$rootScope'/*, '$scope', 'Auth'*/,
        function($rootScope /*,$scope, Auth*/ ) {
          // check that a user is logged in for each request on a route
          // $rootScope.$on(['$stateChangeStart',
          //   function() {
          //     $scope.loggedIn = Auth.isLoggedIn();
          //     // get the user details
          //     Auth.getUser().then(function(response) {
          //       $rootScope.loggedInUser = response.data;
          //     });
          //   }
          // load roles as the on the rootscope
          // $rootScope.roles = [{
          //   title: 'Trainer'
          // }, {
          //   title: 'Documentarian'
          // }, {
          //   title: 'Librarian'
          // }];
        }
      ])
      .config(['$locationProvider',
        '$stateProvider',
        '$mdThemingProvider', '$urlRouterProvider', '$httpProvider',

        function($locationProvider,
          $stateProvider,
          $mdThemingProvider,
          $urlRouterProvider, $httpProvider) {

          // Now set up the states
          $stateProvider
            .state('404', {
              url: '/404',
              templateUrl: 'views/404.html'
            })
            .state('home', {
              url: '/',
              templateUrl: 'views/home.html',
              //controller: 'HeadCtrl'
            })
            // .state('users', {
            //   url: '/users',
            //   templateUrl: 'views/users/users-all.html',
            //   controller: 'UserCtrl'
            // })
            // .state('addUser', {
            //   url: '/users/create',
            //   templateUrl: 'views/users/users-all.html',
            //   controller: 'UserCtrl'
            // })
            // .state('editUser', {
            //   url: '/users/{id}/edit',
            //   templateUrl: 'views/users/users-all.html',
            //   controller: 'UserCtrl'
            // })
            .state('account-login', {
              url: '/users/login',
              templateUrl: 'views/login.html',
              controller: 'UserDialogCtrl'
            })
            .state('account-signup', {
              url: '/users/account',
              templateUrl: 'views/users/create-account.html',
              controller: 'UserDialogCtrl'
            })
            .state('dashboard', {
              url: '/users/dashboard',
              templateUrl: 'views/users/dashboard.html',
              controller: 'DashboadCtrl'
            });

          // when the routes are not found
          //$urlRouterProvider.otherwise('/404');

          // Token injector
          $httpProvider.interceptors.push('AuthInterceptor');

          // Theme colors
          $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('brown');

          $locationProvider.html5Mode(true);
        }
      ]);
  })();