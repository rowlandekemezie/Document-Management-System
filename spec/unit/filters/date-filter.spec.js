(function() {
  'use strict';

  describe('DateFormatter Test', function() {

    var filter, dateFormat;

    beforeEach(function() {
      module('docKip');
    });

    beforeEach(inject(function($injector) {
      filter = $injector.get('$filter');
    }));

    it('should return a string', function() {
      dateFormat = filter('DateFormatter')('2016-02-29T11:34:47+00:00');
      expect(typeof dateFormat).toBe('string');
    });
  });
})();