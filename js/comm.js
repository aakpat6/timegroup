/**
 * comm.js: Deals with communications with firebase.
 */

define(function(require) {
  var Comm = {};

  var countRef = new Firebase('https://timegroup.firebaseio.com/count');

  countRef.once('value', function(snapshot) {
    document.getElementById('canvas').style.display = 'block';
  });

  countRef.on('value', function(snapshot) {
    Comm.count = snapshot.val();
  });

  Comm.setCount = function(count) {
    Comm.count = count;
    countRef.set(count);
  };

  return Comm;
});
