(function() {
  'use strict';

  var documentController = require('./../controllers/document.controller'),
    userAuth = require('./../middlewares/userAuth'),
    userAccess = require('./../middlewares/userAccess');

  module.exports = function(router) {

    // endpoints to create and documents
    router.route('/documents')
      .post(userAuth, documentController.createDocument)
      .get(userAuth, documentController.getAllDocuments);

    // endpoints to update and delete documents.
    // A document can only be updated/deleted by either the owner, SuperAdmin,
    // or Documentarian.
    router.route('/documents/:id')
      .get(userAuth, documentController.getDocumentById)
      .put(userAuth, userAccess, documentController.updateDocument)
      .delete(userAuth, userAccess, documentController.deleteDocument);

    // endpoint for user documents
    router.route('/users/:id/documents')
      .get(userAuth, documentController.getAllDocumentsForUser);

    // endpoint for documents accessible to a role
    router.route('/documents/role/:title/:limit')
      .get(userAuth, documentController.getAllDocumentsForRole);

    // endpoint for documents  created on a specific date
    router.route('/documents/date/:date/:limit')
      .get(userAuth, documentController.getDocumentByDate);

    // endpoint to get all document count
    router.route('/documents/count/all')
      .get(userAuth, documentController.allDocCount);

    // endpoint to document count for a user
    router.route('/documents/getCount/:id')
      .get(userAuth, documentController.countUserDocs);
  };
})();