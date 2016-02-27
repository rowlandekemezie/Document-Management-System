(function() {
  'use strict';

  var Roles = require('../server/api/models/role.model'),
    Users = require('../server/api/models/user.model');

  function report(err) {
    if (err) {
      console.log('There was a problem seeding a user.');
    } else {
      console.log('Successfully seeded SuperAdmin user.');
    }
  }
  var role;
  var initDb = function() {

    var roleData = {
      title: 'SuperAdmin'
    };
    var newRole = new Roles(roleData);
    newRole.save(function(err, roles) {
      role = roles;
      seedUser();
    });
  };

  function seedUser() {
    Users.find({}).exec(function(err, users) {
      if (err) {
        console.log('There was problem seeding user');
      } else {
        if (users.length === 0) {
          var userData = {
            name: {
              firstName: 'Buddy',
              lastName: 'Master'
            },
            role: role.title,
            userName: 'BuddyMaster',
            password: 'owner123',
            email: 'buddymaster@dockip.com'
          };
          var newUser = new Users(userData);
          newUser.save(report);
        }
      }
    });
  }

  module.exports = initDb;
})();