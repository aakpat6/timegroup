/**
 * state.js: Deals with communications with firebase and maintains game state.
 */

define(function(require) {
  'use strict';

  var State = {};

  var Util = require('util');
  var Shape = require('shape');

  State.userId = Util.randString(32);

  State.reloadInstruction = function() {
    State.currentInstruction = Util.randElem(State.shapes);
  };

  State.loadUsers = function(users) {
    State.users = users;
    State.userIdx = _.indexOf(State.users, State.userId);
  };

  var userRef = Util.connectFirebase('/users');
  var connection = userRef.push(State.userId);
  connection.onDisconnect().remove();

  userRef.on('value', function(snapshot) {
    State.loadUsers(_.toArray(snapshot.val()));
  });

  var shapeRef = Util.connectFirebase('/shapes');

  shapeRef.once('value', function(snapshot) {
    State.shapes = _.map(snapshot.val(), function(x) {
      return new Shape(x);
    });
    State.reloadInstruction();
    document.getElementById('canvas').style.visibility = 'visible';
  });

  return State;
});
