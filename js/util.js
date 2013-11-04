/**
 * util.js: Contains some utility functions.
 */

define(function(require) {
  var Util = {};

  Util.randElem = function(arr) {
    if (!arr || !arr.length) {
      return;
    }

    var i = Math.floor(Math.random() * arr.length);
    return arr[i];
  };

  Util.randString = function(len) {
    return Math.random().toString(35).substr(2, len);
  };

  Util.connectFirebase = function(url) {
    return new Firebase('https://timegroup.firebaseio.com' + url);
  };

  return Util;
});
