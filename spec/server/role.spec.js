(function() {
  'use strict';

  var mongoose = require('mongoose'),
    expect = require('chai').expect,
    app = require('./../../index'),
    request = require('supertest')(app),
    jwt = require('jsonwebtoken'),
    config = require('./../../server/config/pass'),
    userName = require('./../../server/config/admin').admin,
    role = require('./../../server/config/admin').role,
    model = require('./../../server/api/models'),
    userData = require('./../../seeds/users.json'),
    roleData = require('./../../seeds/roles.json'),

    User = model.User,
    Role = model.Role;

  describe('ROLE TESTS', function() {
    describe('CRUD ROLE', function() {
      var adminToken, roleId;
      beforeEach(function(done) {
        var newRole = new Role({
          title: 'testRole'
        });
        var userDetail = userData[0];
        userDetail.userName = userName;
        userDetail.role = role;
        var newUser = new User(userDetail);
        newRole.save();
        newUser.save();
        roleId = newRole._id;
        adminToken = jwt.sign(newUser, config.secret, {
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

      it('should create role with the right credentials', function(done) {
        request.post('/api/roles/')
          .set('x-access-token', adminToken)
          .send(roleData[1])
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(err).to.be.a('null');
            expect(err).not.to.be.a('undefined');
            expect(res.body).contain({
              success: true,
              message: 'Role successfuly created'
            });
            done();
          });
      });

      it('should not create role without title', function(done) {
        request.post('/api/roles/')
          .set('x-access-token', adminToken)
          .send('')
          .end(function(err, res) {
            expect(res.status).to.equal(406);
            expect(err).to.be.a('null');
            expect(err).not.to.be.a('undefined');
            expect(res.body).contain({
              success: false,
              message: 'Please, provide role to continue'
            });
            done();
          });
      });

      it('should deny access if not SuperAdmin', function(done) {
        var newUser = new User(userData[1]);
        newUser.save();
        var hackerToken = jwt.sign(newUser, config.secret, {
          expiresIn: 86400
        });
        request.post('/api/roles/')
          .set('x-access-token', hackerToken)
          .send({
            title: 'testRole'
          })
          .end(function(err, res) {
            expect(res.status).to.equal(401);
            expect(err).to.be.a('null');
            expect(err).not.to.be.a('undefined');
            expect(res.body).contain({
              success: false,
              message: 'Access denied'
            });
            done();
          });
      });

      it('should create role with unique title', function(done) {
        request.post('/api/roles/')
          .set('x-access-token', adminToken)
          .send({
            title: 'testRole'
          })
          .end(function(err, res) {
            expect(res.status).to.equal(409);
            expect(err).to.be.a('null');
            expect(err).not.to.be.a('undefined');
            expect(res.body).contain({
              success: false,
              message: 'Role already exist'
            });
            done();
          });
      });

      xit('should return all roles created', function(done) {
        Role.create(roleData, function() {});
        
        request.get('/api/roles/')
          .set('x-access-token', adminToken)
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(err).to.be.a('null');
            expect(res.body[0].title).to.equal('testRole');
            expect(res.body[1].title).to.equal('Documentarian');
            expect(res.body[2].title).to.equal('Trainer');
            expect(res.body[3].title).to.equal('Librarian');
            done();
          });
      });

      it('should return a specific role ', function(done) {
        request.get('/api/roles/' + roleId)
          .set('x-access-token', adminToken)
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(err).to.be.a('null');
            expect(res.body).not.to.be.a('undefined');
            expect(res.body.title).to.equal('testRole');
            done();
          });
      });

      it('should not return role for an invalid role id', function(done) {
        var invalidId = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
        request.get('/api/roles/' + invalidId)
          .set('x-access-token', adminToken)
          .end(function(err, res) {
            expect(res.status).to.equal(404);
            expect(err).to.be.a('null');
            expect(res.body).not.to.be.a('undefined');
            expect(res.body).contain({
              message: 'No role found for the Id',
              success: false
            });
            done();
          });
      });

      it('should update a role that exist', function(done) {
        request.put('/api/roles/' + roleId)
          .set('x-access-token', adminToken)
          .send({
            title: 'manager'
          })
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(err).to.be.a('null');
            expect(res).not.to.be.a('undefined');
            expect(res.body).contain({
              success: true,
              message: 'Role successfully updated'
            });
            done();
          });
      });

      it('should not update invalid role Id', function(done) {
        var invalidId = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
        request.put('/api/roles/' + invalidId)
          .set('x-access-token', adminToken)
          .send({
            title: 'manager'
          })
          .end(function(err, res) {
            expect(res.status).to.equal(404);
            expect(err).to.be.a('null');
            expect(res.body).contain({
              message: 'No role found for the Id',
              success: false
            });
            done();
          });
      });

      it('should delete role that exist', function(done) {
        request.delete('/api/roles/' + roleId)
          .set('x-access-token', adminToken)
          .end(function(err, res) {
            expect(res.status).to.equal(200);
            expect(res.unauthorized).to.equal(false);
            expect(res.body).contain({
              success: true,
              message: 'Successfully deleted'
            });
            done();
          });
      });

      it('should not delete invalid role Id', function(done) {
        var invalidId = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
        request.delete('/api/roles/' + invalidId)
          .set('x-access-token', adminToken)
          .end(function(err, res) {
            expect(res.status).to.equal(404);
            expect(err).to.be.a('null');
            expect(res.body).contain({
              message: 'Role not found',
              success: false
            });
            done();
          });
      });

      it('should not create a role if not superAdmin', function(done) {
        var newUser = new User(userData[1]);
        newUser.save();
        var hackerToken = jwt.sign(newUser, config.secret, {
          expiresIn: 86400
        });
        request.delete('/api/roles/' + roleId)
          .set('x-access-token', hackerToken)
          .end(function(err, res) {
            expect(res.status).to.equal(401);
            expect(err).to.be.a('null');
            expect(res.body).contain({
              message: 'Not authorized',
              success: false
            });
            done();
          });
      });
    });
  });
})();