(function() {
  'use strict';

  angular.module('docKip.services')
    .service('Utils', ['$mdToast', '$interval', '$mdDialog',
      function($mdToast, $interval, $mdDialog) {
        this.toast = function(msg) {
          $mdToast.show($mdToast.simple().content(msg));
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
            .targetEvent(event)
          )
            .then(function() {
              if (typeof cb === 'function') {
                cb();
              }
            }, function() {});
        };

        // progress utility service
        this.progress = function() {
          this.status = 30;
          // Iterate every 100ms, non-stop
          $interval(function() {
            // Increment the Determinate loader
            this.status += 1;
            if (this.status > 100) {
              this.status = 30;
            }
          }, 100, 0, true);
        };

        // modal service
        this.modal = function(ev, tmpl, ctrl) {
          $mdDialog.show({
            controller: ctrl,
            templateUrl: tmpl,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
          });
        };
      }
    ]);
})();