(function() {
  'use strict';

  angular.module('docKip.services')
    .service('Utils', ['$mdToast', '$mdDialog',
      function($mdToast, $mdDialog) {
        this.toast = function(msg) {
          $mdToast.show($mdToast.simple().content(msg).position('bottom left').theme('success-toast'));
        };
        this.dialog = function(title, message, event, cb) {
          $mdDialog.show(
            $mdDialog.confirm()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title(title)
            .content(message)
            .ariaLabel('Utils Dialog Service')
            .ok('OK')
            .cancel('CANCEL')
          )
            .then(function() {
              if (typeof cb === 'function') {
                cb();
              }
            }, function() {});
        };
      }
    ]);
})();