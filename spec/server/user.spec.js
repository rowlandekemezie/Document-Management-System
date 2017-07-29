(function() {
  'use strict';

  var app = require('./../../index'),
    mongoose = require('mongoose'),
    expect = require('chai').expect,
    request = require('supertest')(app),
    jwt = require('jsonwebtoken'),
    config = require('./../../server/config/pass'),
    model = require('./../../server/api/models'),
    userData = require('./../../seeds/users.json'),
    roleData = require('./../../seeds/roles.json'),

    User = model.User,
    Role = model.Role;

  describe('to validate users can login and logout', function() {
    beforeEach(function(done) {
      var newRole = new Role(roleData[0]);
      newRole.save();
      var newUser = new User(userData[0]);
      newUser.save();
      done();
    });

    afterEach(function(done) {
      User.remove({}, function() {
        Role.remove({}, function() {
          done();
        });
      });
    });

    it('should login user on /users/login endpoint', function(done) {
      request.post('/api/users/login')
        .send({
          userName: userData[0].userName,
          password: userData[0].password
        })
        .end(function(err, res) {
          expect(res.body).contain({
            message: 'Login successful',
            success: true
          });
          expect(res.body.token).not.to.be.a('undefined');
          expect(res.statusCode).to.equal(200);
          expect(res.body).not.to.be.a('undefined');
          expect(res.body).not.to.be.a('null');
          expect(res.badRequest).to.equal(false);
          expect(err).to.be.a('null');
          done();
        });
    });

    it('should not login user with the wrong username', function(done) {
      request.post('/api/users/login')
        .send({
          userName: 'Hacker1',
          psssword: userData[0].password
        })

      .end(function(err, res) {
        expect(res.body).contain({
          success: false,
          message: 'Invalid user'
        });
        expect(err).not.to.be.a('undefined');
        expect(res.status).to.equal(406);
        done();
      });
    });

    it('should not login user with the wrong password', function(done) {
      request.post('/api/users/login')
        .send({
          userName: userData[0].userName,
          password: 'wrongPassword'
        })
        .end(function(err, res) {
          expect(res.body).contain({
            success: false,
            message: 'Invalid password'
          });
          expect(err).not.to.be.a('undefined');
          expect(res.status).to.equal(406);
          done();
        });
    });

    it('should logout user', function(done) {
      request.get('/api/users/logout')
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).contain({
            success: true,
            message: 'You are logged out'
          });
          expect(err).to.be.a('null');
          done();
        });
    });
  });

  describe('CREATE USER POST /api/users/', function() {
    beforeEach(function(done) {
      var newRole = new Role(roleData[2]);
      var newUser = new User(userData[2]);
      newUser.save();
      newRole.save();
      done();
    });

    afterEach(function(done) {
      User.remove({}, function() {
        Role.remove({}, function() {
          done();
        });
      });
    });

    it('should create user with the right credentials', function(done) {
      var newUser = {
        userName: 'Hannah6999777',
        firstName: 'Manugas',
        lastName: 'Gafofofrba',
        email: 'manugas@gmail.com',
        role: 'Librarian',
        password: 'awesomecool'
      };
      request.post('/api/users/')
        .send(newUser)
        .end(function(err, res) {
          expect(res.status).to.equal(201);
          expect(err).to.be.a('null');
          expect(res.body).contain({
            success: true,
            message: 'User created successfully'
          });
          done();
        });
    });

    it('should create unique users', function(done) {
      var newuser = {
        userName: userData[2].userName,
        firstName: 'Akodi',
        lastName: 'Gattaffer',
        email: 'akodigattaffer@gmail.com',
        role: 'Librarian',
        password: 'awesomecool'
      };
      request.post('/api/users/')
        .send(newuser)
        .end(function(err, res) {
          expect(res.status).to.equal(409);
          expect(res.body).contain({
            success: false,
            message: 'UserName already exist'
          });
          expect(err).not.to.be.a('undefined');
          expect(err).to.be.a('null');
          done();
        });
    });

    it('should not create user without a valid role', function(done) {
      var newuser = {
        userName: 'Obama',
        firstName: 'Akodi',
        lastName: 'Gattaffer',
        email: 'akodigattaffer@gmail.com',
        role: 'DoesntExist',
        password: 'awesomecool'
      };
      request.post('/api/users/')
        .send(newuser)
        .end(function(err, res) {
          expect(res.status).to.equal(406);
          expect(res.body).contain({
            success: false,
            message: 'Invalid role'
          });
          expect(err).not.to.be.a('undefined');
          expect(err).to.be.a('null');
          done();
        });
    });

    it('should not create user without a role', function(done) {
      var newuser = {
        userName: userData[2].userName,
        firstName: 'Akodi',
        lastName: 'Gattaffer',
        email: 'akodigattaffer@gmail.com',
        role: undefined,
        password: 'awesomecool'
      };
      request.post('/api/users/')
        .send(newuser)
        .end(function(err, res) {
          expect(res.status).to.equal(406);
          expect(res.body).contain({
            success: false,
            message: 'Please, provide your role'
          });
          expect(err).not.to.be.a('undefined');
          expect(err).to.be.a('null');
          done();
        });
    });

    it('should not create user without firstName and lastName', function(done) {
      var newuser = {
        userName: userData[2].userName,
        firstName: '',
        lastName: '',
        email: 'akodigattaffer@gmail.com',
        role: 'Librarian',
        password: 'awesomecool'
      };
      request.post('/api/users/')
        .send(newuser)
        .end(function(err, res) {
          expect(res.status).to.equal(406);
          expect(res.body).contain({
            success: false,
            message: 'Please, provide your firstName and lastName'
          });
          expect(err).not.to.be.a('undefined');
          expect(err).to.be.a('null');
          done();
        });
    });

    it('should not create user without userName and email', function(done) {
      var newuser = {
        userName: '',
        firstName: 'Mmadu',
        lastName: 'Adamu',
        email: '',
        role: 'Librarian',
        password: 'awesomecool'
      };
      request.post('/api/users/')
        .send(newuser)
        .end(function(err, res) {
          expect(res.status).to.equal(406);
          expect(res.body).contain({
            success: false,
            message: 'Please enter your userName and email'
          });
          expect(err).not.to.be.a('undefined');
          expect(err).to.be.a('null');
          done();
        });
    });
  });

  describe('GET USERS GET /api/users', function(done) {
    var id, userToken;
    beforeEach(function(done) {
      var newUser = new User(userData[1]);
      var newRole = new Role(roleData[1]);
      newRole.save();
      newUser.save();
      id = newUser._id;
      userToken = jwt.sign(newUser, config.secret, {
        expiresIn: 86400 // expires in 24hrs
      });
      done();
    });

    afterEach(function(done) {
      User.remove({}, function() {
        Role.remove({}, function() {
          done();
        });
      });
    });

    it('should get a specific user by his id', function(done) {
      request.get('/api/users/' + id)
        .set('x-access-token', userToken)
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).contain({
            userName: 'Godson',
            role: 'Trainer',
            email: 'godsonukpere@gmail.com'
          });
          done();
        });
    });

    it('should return no user with any invalid id', function(done) {
      var invalidId = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
      request.get('/api/users/' + invalidId)
        .set('x-access-token', userToken)
        .end(function(err, res) {
          expect(res.body).contain({
            success: false,
            message: 'No user found by that Id'
          });
          done();
        });
    });

    it('should not return a user unless authenticated', function(done) {
      request.get('/api/users/' + id)
        .end(function(err, res) {
          expect(res.status).to.equal(403);
          expect(res.body).contain({
            success: false,
            message: 'Please provide your token'
          });
          done();
        });
    });

    xit('should return all users created', function(done) {
      var newRole = new Role(roleData[2]);
      var newUser = new User(userData[2]);
      newUser.save();
      newRole.save();
      request.get('/api/users/')
        .set('x-access-token', userToken)
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(2);
          expect(res.body[1]).contain({
            userName: 'Ify',
            email: 'ifeanyioraeolosi@gmail.com',
            role: 'Librarian'
          });
          expect(res.body[0]).contain({
            userName: 'Godson',
            email: 'godsonukpere@gmail.com',
            role: 'Trainer'
          });
          done();
        });
    });

    it('should get the use in sesssion', function(done) {
      var newUser = new User(userData[2]);
      newUser.save();
      id = newUser._id;
      var token = jwt.sign(newUser, config.secret, {
        expiresIn: 86400 // expires in 24hrs
      });

      request.get('/api/users/session')
        .set('x-access-token', token)
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).contain({
            userName: userData[2].userName,
            email: userData[2].email
          });
          done();
        });
    });
  });

  describe('UPDATE USER PUT /api/users/', function() {
    var id, userToken;
    beforeEach(function(done) {
      var newRole = new Role(roleData[0]);
      var newUser = new User(userData[0]);
      newUser.save();
      newRole.save();
      id = newUser._id;
      userToken = jwt.sign(newUser, config.secret, {
        expiresIn: 86400 // expires in 24hrs
      });
      done();
    });

    afterEach(function(done) {
      User.remove({}, function() {
        Role.remove({}, function() {
          done();
        });
      });
    });

    it('should update a specific user with a valid id', function(done) {
      request.put('/api/users/' + id)
        .set('x-access-token', userToken)
        .send({
          userName: 'Haski',
          name: {
            firstName: 'Lamboni',
            lastName: 'Ruskima',
          },
          email: 'lamboniruskina@gmail.com',
          password: 'PythonPhpJavascript',
          role: 'Documentarian'
        })
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).contain({
            message: 'User details updated',
            success: true
          });
          expect(err).not.to.be.a('undefined');
          expect(err).to.be.a('null');
          done();
        });
    });

    it('should not update invalid id', function(done) {
      var invalidId = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
      request.put('/api/users/' + invalidId)
        .set('x-access-token', userToken)
        .send({
          userName: 'Haski',
          name: {
            firstName: 'Lamboni',
            lastName: 'Ruskima',
          },
          email: 'lamboniruskina@gmail.com',
          password: 'PythonPhpJavascript',
          role: 'Documentarian'
        })
        .end(function(err, res) {
          expect(res.status).to.equal(404);
          expect(res.body).contain({
            message: 'User not available',
            success: false
          });
          expect(err).not.to.be.a('undefined');
          expect(err).to.be.a('null');
          done();
        });
    });

    it('should be authenticated before user can update', function(done) {
      request.put('/api/users/' + id)
        .set('x-access-token', userToken)
        .send({
          userName: 'Haski',
          name: {
            firstName: 'Lamboni',
            lastName: 'Ruskima',
          },
          email: 'lamboniruskina@gmail.com',
          password: 'PythonPhpJavascript',
          role: 'Documentarian'
        })
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).contain({
            message: 'User details updated',
            success: true
          });
          expect(err).not.to.be.a('undefined');
          expect(err).to.be.a('null');
          done();
        });
    });

    it('should update user without any detail provided', function(done) {
      request.put('/api/users/' + id)
        .set('x-access-token', userToken)
        .send({
          userName: '',
          name: {
            firstName: '',
            lastName: '',
          },
          email: '',
          password: '',
          role: ''
        })
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).contain({
            message: 'User details updated',
            success: true
          });
          expect(err).not.to.be.a('undefined');
          expect(err).to.be.a('null');
          done();
        });
    });

    it('should update a user without password', function(done) {
      request.put('/api/users/' + id)
        .send({
          userName: 'Haski',
          name: {
            firstName: 'Lamboni',
            lastName: 'Ruskima',
          },
          email: 'lamboniruskina@gmail.com',
          password: '',
          role: 'Documentarian'
        })
        .end(function(err, res) {
          expect(res.status).to.equal(403);
          expect(res.body).contain({
            message: 'Please provide your token',
            success: false
          });
          expect(err).not.to.be.a('undefined');
          expect(err).to.be.a('null');
          done();
        });
    });
  });

  describe('DELETE USER DELETE /api/users/', function() {
    var id, userToken;
    beforeEach(function(done) {
      var newRole = new Role(roleData[2]);
      var newUser = new User(userData[2]);
      newUser.save();
      newRole.save();
      id = newUser._id;
      userToken = jwt.sign(newUser, config.secret, {
        expiresIn: 86400 // expires in 24hrs
      });
      done();
    });

    afterEach(function(done) {
      User.remove({}, function() {
        Role.remove({}, function() {
          done();
        });
      });
    });

    it('should delete user with a specific id', function(done) {
      request.delete('/api/users/' + id)
        .set('x-access-token', userToken)
        .end(function(err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).contain({
            message: 'User deleted successfully',
            success: true
          });
          expect(err).not.to.be.a('undefined');
          expect(err).to.be.a('null');
          done();
        });
    });

    it('should not delete user if not authenticated', function(done) {
      request.delete('/api/users/' + id)
        .end(function(err, res) {
          expect(res.status).to.equal(403);
          expect(res.body).contain({
            message: 'Please provide your token',
            success: false
          });
          expect(err).not.to.be.a('undefined');
          expect(err).to.be.a('null');
          done();
        });
    });

    it('should not delete user with invalid id', function(done) {
      var invalidId = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
      request.delete('/api/users/' + invalidId)
        .set('x-access-token', userToken)
        .end(function(err, res) {
          expect(res.status).to.equal(404);
          expect(res.body).contain({
            message: 'User not available',
            success: false
          });
          expect(err).not.to.be.a('undefined');
          expect(err).to.be.a('null');
          done();
        });
    });

    it('should not authenticate use with an invalid token', function(done){
      var token = 'fbgvkjvabsldfamdsfbnajsdfbasdbfjb'
      request.delete('/api/users/' + id)
        .set('x-access-token', token)
        .end(function(err, res) {
          expect(res.status).to.equal(401);
          expect(res.body).contain({
            message: 'Authentication failed',
            success: false
          });
          expect(err).not.to.be.a('undefined');
          expect(err).to.be.a('null');
          done();
        });
    })
  });
})();