(function() {
    'use strict';

    describe('AdminCtrl Tests', function() {
        var controller,
          scope,
          state,
          Utils,
          stateParams,
          httpBackend,
          Users = {
            query: function(cb) {
              cb([1, 2, 3]);
            },
            save: function(user, cb, cbb) {
              cb();
              cbb();
            }
          },
          Documents = {
            query: function(cb) {
              cb([1, 2, 3]);
            }
          },
          Roles = {
            query: function(cb) {
              cb([1, 2, 4]);
            },
            save: function(role, cb, cbb) {
              if (role) {
                cb(role);
              }
              cbb();
            }
          };

        beforeEach(function() {
          module('docKip');
        });

        beforeEach(inject(function($injector) {
          var $controller = $injector.get('$controller');
          scope = $injector.get('$rootScope');
          controller = $controller('AdminCtrl', {
            $scope: scope,
            $stateParams: stateParams,
            Documents: Documents,
            Users: Users,
            Roles: Roles
          });

          Utils = $injector.get('Utils');
          state = $injector.get('$state');
          httpBackend = $injector.get('$httpBackend');

          httpBackend.when('GET', '/api/users/userInSession').respond(200, {
            user: {
              userName: 'rowlandigwe',
              email: 'great@email.com',
              token: 'test token'
            }
          });

          httpBackend.when('GET', 'views/home.html').respond(200, {
            res: 'yes'
          });

        }));

        it('should call init function', function() {
          spyOn(Users, 'query').and.callThrough();
          spyOn(Roles, 'query').and.callThrough();
          spyOn(Documents, 'query').and.callThrough();
          expect(scope.init).toBeDefined();
          scope.init();
          expect(Users.query).toHaveBeenCalled();
          expect(scope.users).toBeDefined();
          expect(scope.users).toEqual([1, 2, 3]);
          expect(Roles.query).toHaveBeenCalled();
          expect(scope.roles).toBeDefined();
          expect(scope.roles).toEqual([1, 2, 4]);
          expect(Documents.query).toHaveBeenCalled();
          expect(scope.documents).toBeDefined();
          expect(scope.documents).toEqual([1, 2, 3]);
        });

        it('should call scope.createUserBtn', function() {
          spyOn(Users, 'save').and.callThrough();
          spyOn(Utils, 'toast').and.callThrough();
          spyOn(state, 'reload');
          scope.user = {
            userName: 'Row',
            lastName: 'Igwe',
            firstName: 'Eke',
            role: 'Trainer',
            email: 'rowlandigwe@gmail.com',
            password: 'GreatWork'
          };
          scope.createUserBtn();
          expect(Users.save).toHaveBeenCalled();
          expect(Utils.toast).toHaveBeenCalledWith('A new user has been created');
          expect(state.reload).toBeDefined();
        });

        it('should test that $scope.deleteUserBtn and deleteUserFn is defined',
          function() {
            scope.user = {
              _id: 1,
              userName: 'Dotun'
            };
            expect(scope.deleteUserBtn).toBeDefined();
            Utils.dialog = sinon.spy();
            scope.deleteUserBtn({
              _event: 'event'
            }, {
              user: scope.user
            });
            expect(Utils.dialog.called).toBe(true);
            Utils.toast = sinon.spy();
            Users.remove = sinon.spy();
            Utils.dialog.args[0][3]();
            httpBackend.flush();
            expect(Users.remove.called).toBe(true);
            Users.remove.args[0][1]();
            expect(Utils.toast.called).toBe(true);
          });

        it('should call $scope.deleteUserBtn and deleteUserFn and fail',
          function() {
            scope.user = {
              _id: '',
              userName: 'Great'
            };
            expect(scope.deleteUserBtn).toBeDefined();
            Utils.dialog = sinon.spy();
            scope.deleteUserBtn({
              _event: 'event'
            }, {
              user: scope.user
            });
            expect(Utils.dialog.called).toBe(true);
            Utils.toast = sinon.spy();
            Users.remove = sinon.spy();
            Utils.dialog.args[0][3]();
            httpBackend.flush();
            expect(Users.remove.called).toBe(true);
            Users.remove.args[0][1]();
            // expect(scope.status).toBeDefined();
          });


        it('should call scope.createRoleBtn', function() {
          scope.role = {
            title: 'Trainer'
          };
          spyOn(Roles, 'save').and.callThrough();
          spyOn(Utils, 'toast').and.callThrough();
          spyOn(state, 'reload');
          scope.createRoleBtn();
          expect(Roles.save).toHaveBeenCalled();
          expect(Utils.toast).toHaveBeenCalledWith('Role created');
          expect(state.reload).toHaveBeenCalled();
        });

        it('should call scope.createRoleBtn and fail', function() {
          scope.role = '';
          spyOn(Roles, 'save').and.callThrough();
          spyOn(Utils, 'toast').and.callThrough();
          scope.createRoleBtn();
          expect(Roles.save).toHaveBeenCalled();
          expect(Utils.toast).toHaveBeenCalledWith('Can not create role');
          expect(scope.status).toBeDefined();
        });

        it('should test that $scope.deleteRoleBtn and deleteRoleFn is defined',
          function() {
            scope.role = {
              id: 1,
              title: 'Librarian'
            };
            expect(scope.deleteRoleBtn).toBeDefined();
            Utils.dialog = sinon.spy();
            scope.deleteRoleBtn({
              _event: 'event'
            }, {
              role: scope.role
            });
            expect(Utils.dialog.called).toBe(true);
            Utils.toast = sinon.spy();
            state.reload = sinon.spy();
            Roles.remove = sinon.spy();
            Utils.dialog.args[0][3]();
            httpBackend.flush();
            expect(Roles.remove.called).toBe(true);
            Roles.remove.args[0][1]();
            expect(Utils.toast.called).toBe(true);
            expect(state.reload.called).toBe(true);
          });

        it('should unsuccessfully call $scope.deleteRoleBtn and deleteRoleFn',
          function() {
            scope.role = {
              id: '',
              title: 'Librarian'
            };
            expect(scope.deleteRoleBtn).toBeDefined();
            Utils.dialog = sinon.spy();
            scope.deleteRoleBtn({
              _event: 'event'
            }, {
              role: scope.role
            });
            expect(Utils.dialog.called).toBe(true);
            Utils.toast = sinon.spy();
            Roles.remove = sinon.spy();
            Utils.dialog.args[0][3]();
            httpBackend.flush();
            expect(Roles.remove.called).toBe(true);
            Roles.remove.args[0][1]();
            expect(Utils.toast.called).toBe(true);
          });

        it('should call scope.deleteDocBtn and deleteDoc function', function() {
            // scope.doc = {
            //   _id: 1,
            //   title: 'test title'
            // };

            // spyOn(Documents, 'remove').and.callThrough();
            // spyOn(Utils, 'dialog');
            // spyOn(Utils, 'toast');
            // expect(scope.deleteDocBtn).toBeDefined();
            // scope.deleteDocBtn({
            //   event: 'event'
            // }, {
            //   doc: scope.doc
            // });
            // expect(Documents.remove).toHaveBeenCalled();
            // expect(Utils.dialog).toHaveBeenCalled();
            // expect(Utils.toast).toHaveBeenCalled();

            // function() {
            //   scope.user = {
            //     _id: 1,
            //     userName: 'Dotun'
            //   }
            //   expect(scope.deleteUserBtn).toBeDefined();
            //   Utils.dialog = sinon.spy();
            //   scope.deleteUserBtn({
            //     _event: 'event'
            //   }, {
            //     user: scope.user
            //   });
            //   expect(Utils.dialog.called).toBe(true);
            //   Utils.toast = sinon.spy();
            //   Users.remove = sinon.spy();
            //   Utils.dialog.args[0][3]();
            //   httpBackend.flush();
            //   expect(Users.remove.called).toBe(true);
            //   Users.remove.args[0][1]();
            //   expect(Utils.toast.called).toBe(true);
            // });

          scope.doc = {
            _id: '1',
            title: 'test title'
          };

          expect(scope.deleteDocBtn).toBeDefined();
          Utils.dialog = sinon.spy();
          scope.deleteDocBtn({
            _event: 'event'
          }, {
            doc: scope.doc
          });
          expect(Utils.dialog.called).toBe(true);
          Utils.toast = sinon.spy();
          state.reload = sinon.spy();
          Documents.remove = sinon.spy();
          Utils.dialog.args[0][3]();
          httpBackend.flush();
          expect(Documents.remove.called).toBe(true);
          Documents.remove.args[0][1]();
          expect(Utils.toast.called).toBe(true);
          expect(state.reload.called).toBe(true);
        });

      it('should unsuccessfully call scope.deleteDocBtn and deleteDoc function', function() {
        scope.doc = {
          _id: null,
          title: 'test title2'
        };
        expect(scope.deleteDocBtn).toBeDefined();
        Utils.dialog = sinon.spy();
        scope.deleteDocBtn({
          _event: 'event'
        }, {
          doc: scope.doc
        });
        expect(Utils.dialog.called).toBe(true);
        Utils.toast = sinon.spy();
        Documents.remove = sinon.spy();
        Utils.dialog.args[0][3]();
        httpBackend.flush();
        expect(Documents.remove.called).toBe(true);
        Documents.remove.args[0][1]();
        expect(Utils.toast.called).toBe(true);
        //expect(scope.status).toBeDefined();
      });

      it('should call getName function', function() {
        scope.users[0] = {
          _id: 1,
          userName: 'Trainer'
        };
        var nameConverter = scope.getName(1);
        expect(nameConverter).toBeTruthy();
      });

      it('should call getName function and fail', function() {
        scope.users[0] = {
          _id: 1,
          userName: 'Trainer'
        };
        var nameConverter = scope.getName(2);
        expect(nameConverter).toBeFalsy();
      });

    });
})();