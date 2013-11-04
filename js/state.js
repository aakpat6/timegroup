/**
 * state.js: Deals with communications with firebase and maintains game state.
 */

define(function(require) {
  'use strict';

  var State = {};

  var Util = require('util');
  var Shape = require('shape');

  var countRef = new Firebase('https://timegroup.firebaseio.com/count');

  var shapeRef = new Firebase('https://timegroup.firebaseio.com/shapes');

  shapeRef.once('value', function(snapshot) {
    State.shapes = _.map(snapshot.val(), function(x) {
      return new Shape(x);
    });
    State.currentInstruction = Util.randElem(State.shapes);
    document.getElementById('canvas').style.visibility = 'visible';
  });

  return State;
});
