(function() {
  'use strict';

  var models = require('./../models'),
    Role = models.Role,
    Document = models.Document;

  module.exports = {
    /**
     * [createDocument method]
     * @param  {[JSON]} req [http request body]
     * @param  {[JSON]} res [response on request]
     * @return {[JSON]}     [Json status]
     */
    createDocument: function(req, res) {
      var doc = req.body;
      Role.findOne({
        title: doc.role
      }, function(err, role) {
        if (err) {
          res.status(500).json(err);
        } else {
          if (!role) {
            res.status(406).json({
              success: false,
              message: 'Invalid role'
            });
          } else if (role) {
            Document.findOne({
              title: doc.title
            }, function(err, docs) {
              if (docs) {
                res.status(409).json({
                  success: false,
                  message: 'Document already exist'
                });
              } else if (!docs) {
                var userId = req.decoded._id;
                req.body.ownerId = userId;
                // TODO: To add users name to the document
                // for easy search.
               // req.body.userName = req.decoded.userName;
                var newDoc = new Document(doc);
                newDoc.save(function(err) {
                  if (err) {
                    res.status(500).json(err);
                  } else {
                    res.status(200).json({
                      success: true,
                      message: 'Document successfully created'
                    });
                  }
                });
              }
            });
          }
        }
      });
    },
    /**
     * [getAllDocuments method]
     * @param  {[JSON]} req [http request to get endpoint]
     * @param  {[JSON]} res [response on request]
     * @return {[JSON]}     [Status and json documents on success]
     */
    getAllDocuments: function(req, res) {
      Document.find({})
      .limit(parseInt(req.params.limit))
      .exec(function(err, docs) {
        if (err) {
          res.status(500).json(err);
        } else if (docs.length < 1) {
          res.status(404).json({
            success: false,
            message: 'No document found'
          });
        } else {
          res.status(200).json(docs);
        }
      });
    },
    /**
     * [getDocumentById method]
     * @param  {[JSON]} req [request params]
     * @param  {[JSON]} res [response on request]
     * @return {[JSON]}     [Json status]
     */
    getDocumentById: function(req, res) {
      Document.findOne({
        _id: req.params.id
      }, function(err, doc) {
        if (err) {
          res.status(500).json(err);
        } else if (!doc) {
          res.status(404).json({
            success: false,
            message: 'No document found for the Id'
          });
        } else {
          res.status(200).json(doc);
        }
      });
    },
    /**
     * [getDocumentByDate method]
     * @param  {[http resquest]} req [http request params]
     * @param  {[http response]} res [http response on request]
     * @return {[JSON]}     [Json response and/or status]
     */
    getDocumentByDate: function(req, res) {
      Document.find({
        dateCreated: req.params.dateCreated
      })
      .limit(parseInt(req.params.limit))
      .exec(function(err, docs) {
        if (err) {
          res.status(500).json(err);
        } else if (docs.length < 1) {
          res.status(404).json({
            success: false,
            message: 'No document found'
          });
        } else {
          res.status(200).json(docs);
        }
      });
    },
    /**
     * [getAllDocumentsForUser method]
     * @param  {[JSON]} req [http request params]
     * @param  {[JSON]} res [http response on response]
     * @return {[JSON]}     [json status of the response]
     */
    getAllDocumentsForUser: function(req, res) {
      Document.find({
        ownerId: req.params.id
      })
      .limit(parseInt(req.params.limit))
      .exec(function(err, docs) {
        if (err) {
          res.status(500).json(err);
        } else if (docs.length < 1) {
          res.status(404).json({
            success: false,
            message: 'User has no document'
          });
        } else {
          res.status(200).json(docs);
        }
      });
    },
    /**
     * [getAllDocumentsForRole method]
     * @param  {[http request]} req [http request params]
     * @param  {[http response]} res [http response on request]
     * @return {[JSON]}     [json response and/or status]
     */
    getAllDocumentsForRole: function(req, res) {
      Document.find({
        role: req.params.title
      }).limit(parseInt(req.params.limit))
      .exec(function(err, docs) {
        if (err) {
          res.status(500).json(err);
        } else if (docs.length < 1) {
          res.status(404).json({
            success: false,
            message: 'Role has no document'
          });
        } else {
          res.status(200).json(docs);
        }
      });
    },
    /**
     * [updateDocument method]
     * @param  {[JSON]} req [request params]
     * @param  {[JSON]} res [response on request]
     * @return {[JSON]}     [status of search result]
     */
    updateDocument: function(req, res) {
      Document.findByIdAndUpdate(req.params.id, req.body, function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json({
            success: true,
            message: 'Document updated successfully'
          });
        }
      });
    },
    /**
     * [deleteDocument method]
     * @param  {[JSON]} req [request params]
     * @param  {[JSON]} res [response on request]
     * @return {[JSON]}     [status]
     */
    deleteDocument: function(req, res) {
      Document.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json({
            success: true,
            message: 'Document deleted successfully'
          });
        }
      });
    }
  };
})();