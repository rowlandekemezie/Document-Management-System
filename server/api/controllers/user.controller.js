(function() {
  'use strict';

  var models = require('./../models'),
    config = require('./../../config/pass'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt-nodejs'),

    /**
     * Models instancies
     * @type {[Objects]}
     */
    User = models.User,
    Role = models.Role,

    /**
     * [stripUser functioin]
     * @param  {[type]} user [description]
     * @return {[type]}      [description]
     */
    stripUser = function(user) {
      user.password = null;
      user.token = null;
      return user;
    };

  module.exports = {

    /**
     * [logout method]
     * @param  {[http request]} req [request session]
     * @param  {[http response]} res [response on request]
     * @return {[json]}     [Json response]
     */
    logout: function(req, res) {
      req.session.destroy(function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json({
            success: true,
            message: 'You are logged out'
          });
        }
      });
    },
    /**
     * [login method]
     * @param  {[http request]} req [http request body]
     * @param  {[http response]} res [http response on request]
     * @return {[JSON]}     [response status]
     */
    login: function(req, res) {
      console.log(req.body);
      User.findOne({
        $or: [{
          userName: req.body.userName
        }, {
          email: req.body.email
        }]
      }, function(err, user) {
        if (err) {
          res.status(500).json(err);
        }
        if (!user) {
          res.status(406).json({
            success: false,
            message: 'Invalid user'
          });
        } else if (user) {
          var isValid = user.comparePassword(req.body.password);
          if (!isValid) {
            res.status(406).json({
              success: false,
              message: 'Invalid password'
            });
          } else {
            var token = jwt.sign(user, config.secret, {
              expiresIn: 1440 // expires in 24 hrs
            });
            delete user.password;
            res.status(200).json({
              token: token,
              success: true,
              user: user,
              message: 'Login successful'
            });
          }
        }
      });
    },
    session: function(req, res) {
      var token = req.headers['x-access-token'] || req.params.token ||
        req.query.token;
      if (token && token !== 'null') {
        jwt.verify(token, config.secret, function(err, decoded) {
          if (err) {
            res.status(403).json({
              error: 'Session has expired or does not exist.'
            });
          } else {
            User.findById(decoded._id, function(err, user) {
              if (!user) {
                res.status(404).json({
                  message: 'User not found'
                });
              } else {
                delete user.password;
                req.decoded = user;
                res.json(stripUser(user));
              }
            });
          }
        });
      } else {
        res.status(401).json({
          error: 'Session has expired or does not exist.'
        });
      }
    },
    /**
     * [createUser method]
     * @param  {[http request]} req [http request body]
     * @param  {[http response]} res [http response on request]
     * @return {[JSON]}     [response status]
     */
    createUser: function(req, res) {
      var userData = req.body;
      if (!userData.role) {
        res.status(406).json({
          success: false,
          message: 'Please, provide your role'
        });
      } else if (!(userData.firstName && userData.lastName)) {
        res.status(406).json({
          success: false,
          message: 'Please, provide your firstName and lastName'
        });
      } else if ((userData.password).length < 8 || undefined) {
        res.status(406).json({
          success: false,
          message: 'Password must not be less than 8 characters'
        });
      } else if (!userData.email || !userData.userName) {
        res.status(406).json({
          success: false,
          message: 'Please enter your userName and email'
        });
      } else {
        Role.findOne({
          title: userData.role
        }, function(err, roles) {
          if (!roles) {
            res.status(406).json({
              success: false,
              message: 'Invalid role'
            });
          } else {
            User.findOne({
              userName: userData.userName,
              email: userData.email
            }, function(err, users) {
              if (users) {
                res.status(409).json({
                  success: false,
                  message: 'UserName already exist'
                });
              } else {
                var userDetail = {
                  name: {
                    firstName: userData.firstName,
                    lastName: userData.lastName
                  },
                  userName: userData.userName,
                  email: userData.email,
                  password: userData.password,
                  role: userData.role
                };
                var newUser = new User(userDetail);
                newUser.save(function(err) {
                  if (err) {
                    res.status(500).json(err);
                  } else {
                    res.status(200).json({
                      success: true,
                      message: 'User created successfully'
                    });
                  }
                });
              }
            });
          }
        });
      }
    },
    /**
     * [getAllUsers method]
     * @param  {[http request]} req [http request on API]
     * @param  {[http response]} res [http response on resquest]
     * @return {[JSON]}     [response status and/or json response]
     */
    getAllUsers: function(req, res) {
      User.find({}, function(err, users) {
        if (err) {
          res.status(500).json(err);
        } else if (!users) {
          res.status(404).json({
            success: false,
            message: 'No user found'
          });
        } else {
          res.status(200).json(users);
        }
      });
    },
    /**
     * [getUser method]
     * @param  {[http request]} req [http request params]
     * @param  {[http response]} res [http response on request]
     * @return {[JSON]}     [json response and/or status]
     */
    getUser: function(req, res) {
      User.findById(req.params.id, function(err, user) {
        if (err) {
          res.status(500).json(err);
        } else if (!user) {
          res.status(404).json({
            success: false,
            message: 'No user found by that Id'
          });
        } else {
          res.status(200).json(user);
        }
      });
    },
    /**
     * [updateUser method]
     * @param  {[http request]} req [http request params and body]
     * @param  {[http response]} res [http response on request]
     * @return {[JSON]}     [json response and/or status]
     */
    updateUser: function(req, res) {
      var userData = req.body;

      User.findById(req.params.id, function(err, user) {
        if (err) {
          res.status(500).json(err);
        }
        var updateFn = function() {
          // set the new user information if it exists in the request
          var userDetail = {
            name: {
              firstName: userData.name.firstName || user.name.firstName,
              lastName: userData.name.lastName || user.name.lastName
            },
            userName: userData.userName || user.userName,
            password: userData.password || user.password,
            email: userData.email || user.email,
            role: userData.role || user.role
          };
          User.findByIdAndUpdate(req.params.id, userDetail,
            function(err, user) {
              if (err) {
                res.status(500).json(err);
              } else if (!user) {
                res.status(404).json({
                  success: false,
                  message: 'User not available'
                });
              } else {
                delete user.password;
                var token = jwt.sign(user, config.secret, {
                  expiresIn: 1440 // expires in 24 hrs
                });
                res.status(200).json({
                  success: true,
                  message: 'User details updated',
                  token: token,
                  user: user
                });
              }
            });
        };
        // check if password is provided and hash it before saving
        if (userData.password) {
          bcrypt.hash(userData.password, null, null, function(err, hash) {
            if (err) {
              res.status(500).send({
                success: false,
                message: 'Error saving password.'
              });
            } else {
              req.body.password = hash;
              updateFn();
            }
          });
        } else {
          updateFn();
        }
      });
    },
    /**
     * [deleteUser method]
     * @param  {[http request]} req [http request params]
     * @param  {[http response]} res [http response on request]
     * @return {[JSON]}     [response status]
     */
    deleteUser: function(req, res) {
      User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) {
          res.status(500).json(err);
        } else if (!user) {
          res.status(404).json({
            success: false,
            message: 'User not available'
          });
        } else {
          res.status(200).json({
            success: true,
            message: 'User deleted successfully'
          });
        }
      });
    },
    /**
     * [countUserDocs function]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    countUserDocs: function(req, res) {
      Document
        .aggregate()
        .group({
          _id: '$ownerId',
          count: {
            $sum: 1
          }
        })
        .exec(function(err, docs) {
          if (err) {
            res.status(500).send({
              success: false,
              message: 'There was a problem fetching the documents'
            });
          } else {
            res.send(docs);
          }
        });
    }

  };
})();
