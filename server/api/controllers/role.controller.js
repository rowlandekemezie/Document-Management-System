(function() {
  'use strict';

  var Role = require('./../models').Role;
  /**
   * [createRole method]
   * @param  {[http request]} req [request body]
   * @param  {[http response]} res [response on request]
   * @return {[status]}     [Json response]
   */
  exports.createRole = function(req, res) {
    var adminRole = req.body;
    if (adminRole.title) {
      Role.findOne({
        title: adminRole.title
      }, function(err, roles) {
        if (roles) {
          res.status(409).json({
            success: false,
            message: 'Role already exist'
          });
        } else {
          var newRole = new Role(adminRole);
          newRole.save(function(err, role) {
            if (err) {
              res.json(err);
            } else {
              res.json({
                success: true,
                role: role,
                message: 'Role successfuly created'
              });
            }
          });
        }
      });
    } else {
      res.status(406).json({
        success: false,
        message: 'Please, provide role to continue'
      });
    }
  };
  /**
   * [getAllRoles method]
   * @param  {[http request]} req [http request on the Roles Model]
   * @param  {[http response]} res [response on request]
   * @return {[JSON]}     [result of the search]
   */
  exports.getAllRoles = function(req, res) {
    Role.find({}).exec(function(err, roles) {
      if (err) {
        res.status(500).json(err);
      } else if (!roles) {
        res.json({
          message: 'No role exist',
          success: true
        });
      } else {
        res.json(roles);
      }
    });
  };
  /**
   * [getRoleById method]
   * @param  {[http request]} req [request params]
   * @param  {[http response]} res [json response on request]
   * @return {[JSON]}     [status and/or json result]
   */
  exports.getRoleById = function(req, res) {
    Role.findOne({
      _id: req.params.id
    }, function(err, role) {
      if (err) {
        res.status(500).json(err);
      } else if (!role) {
        res.status(404).json({
          success: false,
          message: 'No role found for the Id'
        });
      } else {
        res.json(role);
      }
    });
  };
  /**
   * [updateRole method]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  exports.updateRole = function(req, res) {
    Role.findByIdAndUpdate(req.params.id, req.body, function(err, role) {
      if (err) {
        req.status(500).json(err);
      } else if (!role) {
        res.status(404).json({
          success: false,
          message: 'No role found for the Id'
        });
      } else {
        res.json({
          message: 'Role successfully updated',
          success: true
        });
      }
    });
  };
  /**
   * [updateRole method]
   * @param  {[http request]} req [takes the userId paramter to be updated]
   * @param  {[http response]Json Json response]
   */
  exports.deleteRole = function(req, res) {
    Role.findByIdAndRemove(req.params.id, function(err, role) {
      if (err) {
        res.status(500).json(err);
      } else if (!role) {
        res.status(404).json({
          success: false,
          message: 'Role not found'
        });
      } else {
        res.json({
          success: true,
          role: role,
          message: 'Successfully deleted'
        });
      }
    });
  };
})();