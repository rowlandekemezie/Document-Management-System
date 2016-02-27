(function() {
  'use strict';

  angular.module('docKip.filters')
    .filter('DateFormatter', function() {
      return function(date) {
        return moment(date).fromNow();
      };
    })
    .filter('array', function() {
      return function(items) {
        var filtered = [];
        angular.forEach(items, function(item) {
          filtered.push(item);
        });
        return filtered;
      };
    });
})();