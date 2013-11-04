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

  return Util;
});
