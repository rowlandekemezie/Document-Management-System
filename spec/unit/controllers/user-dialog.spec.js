// (function() {
//   'use strict';

//   describe('UserDialogCtrl', function() {
//     var rootScope, scope, mdDialog, Roles,
//       Users, Auth, controller, httpBackend;

//     beforeEach(function() {
//       module('docKip');
//     });

//     beforeEach(function() {
//       var controller = $injector.get('controller');
//       $rootScope = $injector.get('$rootScope');
//       $scope = $rootScope;
//       $mdDialog = $injector.get('$mdDialog');
//       Roles = $injector.get('Roles');
//       Users = $injector.get('Users');
//       Auth = $injector.get('Auth');
//       controller = $controller('DialogController', {
//         $scope: scope
//       });
//     });


//     describe('scope.cancel test', function() {
//       it('Should define $scope.cancel', function() {
//         expect(scope.cancel).toBeDefined();
//         mdDialog.cancel = sinon.stub();
//         scope.cancel();
//         expect(mdDialog.cancel.called).toBe(true);
//       });
//     });

//     describe('scope.hide test', function() {
//       it('Should define scope.hide', function() {
//         expect(scope.hide).toBeDefined();
//         mdDialog.hide = sinon.stub();
//         scope.hide();
//         expect(mdDialog.hide.called).toBe(true);
//       });
//     });

//     describe('Roles.query test', function() {
//       it('Should define Roles.query', function() {
//         httpBackend.flush();
//         expect(Roles.query.called).toBe(true);
//         Roles.query.args[0][0]('rowland');
//         expect(scope.roles).toBeDefined();
//         expect(scope.roles).toBe('rowland');
//       });
//     });
//   });
// })();