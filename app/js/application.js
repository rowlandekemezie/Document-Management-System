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
      .run(['$rootScope' /*, '$scope', 'Auth'*/ ,
        function($rootScope, $scope, Auth) {
          // check that a user is logged in for each request on a route
          $rootScope.$on(['$stateChangeStart',
            function() {
              $scope.loggedIn = Auth.isLoggedIn();
              // get the user details
              Auth.getUser().then(function(response) {
                $rootScope.loggedInUser = response.data;
              });
            }
          ]);
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
            .state('dashboard', {
              url: '/users/dashboard',
              templateUrl: 'views/users/dashboard.html',
              controller: 'DashboadCtrl'
            })
            .state('editProfile.dashboard', {
              url: '/{id}/edit',
              views: {
                'inner-view@dashboard': {
                  controller: 'EditProfileCtrl',
                  templateUrl: 'views/edit-profile'
                }
              }
            })
            .state('all.dashboard', {
              url: '/{id}/documents',
              views: {
                'inner-view@dashboard': {
                  templateUrl: 'views/users/all-dashboard.html',
                  controller: 'DashboardCtrl'
                }
              }
            });

          // when the routes are not found
          $urlRouterProvider.otherwise('/404');

          // Token injector
          $httpProvider.interceptors.push('AuthInterceptor');

          // Theme colors
          $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('brown');

          $locationProvider.html5Mode(true);
        }
      ]);
  })();