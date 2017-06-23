 (function() {
   'use strict';

   // angular modules
   angular.module('docKip.services', []);
   angular.module('docKip.controllers', []);
   angular.module('docKip.filters', []);

   // require services
   require('./services/users/auth-services');
   require('./services/users/user-service');
   require('./services/role-service');
   require('./services/document-service');
   require('./services/utils');

   // require controllers
   require('./controllers/header');
   require('./controllers/create-account');
   require('./controllers/dashboard');
   require('./controllers/home.js');
   require('./controllers/document');
   require('./controllers/profile');
   require('./controllers/admin');

   // require filters
   require('./filters/date-filter');

   angular.module('docKip', [
     'docKip.services',
     'docKip.controllers',
     'docKip.filters',
     'ngRoute',
     'ngResource',
     'ngMaterial',
     'ui.router',
     'ngAnimate',
     'md.data.table',
     'textAngular',
   ])
     .run(['$rootScope', 'Auth', '$state', 'Users', '$log',
       function($rootScope, Auth, $state, Users, $log) {

         // solution #1: on change of state, ensure the user is logged
         // Else redirect to login
         $rootScope.$on('$stateChangeSuccess', fireAuth);

         function fireAuth(ev, toState) {
           if (toState.authenticate && $rootScope.loggedInUser) {
             ev.preventDefault();
             $state.go(toState);
           } else {
             ev.preventDefault();
             $state.go('home');
           }
         }

         // check that the user is in session and make global the user's details
         Users.getUser(function(err, res) {
           if (!err && res) {
             $rootScope.loggedInUser = res.data;
           } else {
             $log.debug(err);
           }
         });
       }
     ])
     .config(['$locationProvider',
       '$stateProvider',
       '$mdThemingProvider', '$urlRouterProvider', '$httpProvider',

       function($locationProvider,
         $stateProvider,
         $mdThemingProvider,
         $urlRouterProvider, $httpProvider) {

         // Set up the states
         $stateProvider
           .state('home', {
             url: '/',
             templateUrl: 'views/home.html',
             controller: 'HomeCtrl'
           })

         .state('dashboard', {
           url: '/users/{id}/dashboard',
           authenticate: true,
           views: {
             '@': {
               templateUrl: 'views/users/dashboard.html',
               controller: 'DashboardCtrl'
             },
             'inner-view@dashboard': {
               templateUrl: 'views/users/user-documents.html'
             }
           }
         })

          .state('dashboard.editProfile', {
           url: '/edit',
           authenticate: true,
           views: {
             'inner-view@dashboard': {
               controller: 'EditProfileCtrl',
               templateUrl: 'views/edit-profile.html'
             }
           }
         })
           .state('dashboard.document', {
             url: '/documents/create',
             authenticate: true,
             views: {
               'inner-view@dashboard': {
                 controller: 'DocumentCtrl',
                 templateUrl: 'views/create-document.html'
               }
             }
           })

         .state('dashboard.all', {
           url: '/documents',
           authenticate: true,
           views: {
             'inner-view@dashboard': {
               templateUrl: 'views/all-documents.html'
             }
           }
         })
           .state('admin', {
             url: '/{id}/control-panel/{section}',
             authenticate: true,
             templateUrl: 'views/admin.html',
             controller: 'AdminCtrl'
           })

         .state('dashboard.edit-document', {
           url: '/{docid}/edit',
           authenticate: true,
           views: {
             'inner-view@dashboard': {
               templateUrl: 'views/edit-document.html',
               controller: 'DocumentCtrl'
             }
           }
         })

         .state('dashboard.view-document', {
           url: '/{docid}/view',
           authenticate: true,
           views: {
             'inner-view@dashboard': {
               templateUrl: 'views/view-document.html',
               controller: 'DocumentCtrl'
             }
           }
         })

         .state('404', {
           url: '/404',
           templateUrl: 'views/404.html'
         });

         // when the routes are not found
         $urlRouterProvider.otherwise('/404');

         // Token injector
         $httpProvider.interceptors.push('AuthInterceptor');

         // Theme colors
         $mdThemingProvider.theme('grey')
           .primaryPalette('grey')
           .accentPalette('indigo');

         $locationProvider.html5Mode(true);
       }
     ]);
 })();