(function() {
  'use strict';

  var date = function() {
    var datetime = new Date();

    // format the output
    var month = datetime.getMonth() + 1,
      day = datetime.getDate(),
      year = datetime.getFullYear(),
      hour = datetime.getHours();
    if (hour < 10) {
      hour = '0' + hour;
    }
    var min = datetime.getMinutes();
    if (min < 10) {
      min = '0' + min;
    }
    var sec = datetime.getSeconds();
    if (sec < 10) {
      sec = '0' + sec;
    }

    // put it all together
    var dateTimeString = year + '-' + month + '-' +
    day + ' ' + hour + ':' + min + ':' + sec;
    return dateTimeString;
  };
  module.exports = date;
})();