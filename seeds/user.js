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

    Roles.find({}).exec(function(err, roles) {
      if (err) {
        console.log('There was problem seeding roles');
      } else {
        if (roles.length === 0) {
          var roleData = {
            title: 'SuperAdmin'
          };
          var newRole = new Roles(roleData);
          role = newRole.save();
          seedUser();
        }
      }
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
              first: 'Buddy',
              last: 'Master'
            },
            role: role.title,
            username: 'BuddyMaster',
            password: 'ApplicationOwner',
            email: 'buddymaster@dockip.com'
          };
          userData.save(report());
        }
      }
    });
  }

  module.export = initDb;
})();