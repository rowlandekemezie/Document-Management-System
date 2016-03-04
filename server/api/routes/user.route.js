(function() {
  'use strict';

  var userController = require('./../controllers/user.controller'),
    userAuth = require('./../middlewares/userAuth');

  // create route definitions
  module.exports = function(router) {

    // route for login. This requires autheentication
    router.route('/users/login')
      .post(userController.login);

    // getting the user information
    router.route('/users/session')
     .get(userController.session);

    // route for logout. This requires that a user is signIn
    router.route('/users/logout')
      .get(userController.logout);

    // route to create new user requires no authentication
    // but viewing users does.
    router.route('/users')
      .post(userController.createUser)
      .get(userAuth, userController.getAllUsers);

    // routes to GET, UPDATE and DELETE users.
    // This requires authentication
    router.route('/users/:id')
      .get(userAuth, userController.getUser)
      .put(userAuth, userController.updateUser)
      .delete(userAuth, userController.deleteUser);
  };
})();