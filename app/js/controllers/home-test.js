(function() {
  'use strict';

  angular.module('docKip.controllers')
    .controller('HomeCtrl', ['scope', '$state',
      function(scope, $state) {
        scope.init = function(){
          $state.go('home');
        };
        scope.init();
      }
    ]);

})();