/**
 * state.js: Deals with communications with firebase and maintains game state.
 */

define(function(require) {
  'use strict';

  var State = {};

  var countRef = new Firebase('https://timegroup.firebaseio.com/count');

  var shapeRef = new Firebase('https://timegroup.firebaseio.com/shapes');

  shapeRef.once('value', function(snapshot) {
    State.shapes = snapshot.val();
  });

  countRef.once('value', function(snapshot) {
    document.getElementById('canvas').style.display = 'block';
  });

  countRef.on('value', function(snapshot) {
    State.count = snapshot.val();
  });

  State.incrementCount = function() {
    countRef.transaction(function(cur) {
      return cur + 1;
    });
  };

  return State;
});
