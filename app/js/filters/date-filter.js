(function() {
  'use strict';

  angular.module('docKip.filters')
    .filter('DateFormatter', function() {
      return function(date) {
        return moment(date).fromNow();
      };
    });
})();