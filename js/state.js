/**
 * state.js: Deals with communications with firebase and maintains game state.
 */

define(function(require) {
  'use strict';

  var State = {};

  var Util = require('util');
  var Shape = require('shape');
  var C = require('constants');

  State.userId = Util.randString(C.UID_LEN);

  State.reloadInstruction = function() {
    if (!State.users) return;
    State.currentInstruction = Util.randElem(State.shapesToRender);
  };

  State.loadUsers = function(users) {
    State.users = users;
    State.userIdx = _.indexOf(State.users, State.userId);
    _.forEach(State.shapes, function(s) {
      s.remove();
    });
    State.buckets = Util.makeBuckets(State.shapes, State.users.length);
    var i = State.users.indexOf(State.userId);
    State.shapesToRender = State.buckets[i];
    State.reloadInstruction();
  };

  var shapeRef = Util.connectFirebase('/shapes');

  shapeRef.once('value', function(snapshot) {
    State.shapes = _.map(snapshot.val(), function(x) {
      return new Shape(x);
    });
    State.reloadInstruction();
    document.getElementById('canvas').style.visibility = 'visible';
  });

  var userRef = Util.connectFirebase('/users');
  var connection = userRef.push(State.userId);
  connection.onDisconnect().remove();

  userRef.on('value', function(snapshot) {
    if (State.users === snapshot.val()) return;
    var users = _.toArray(snapshot.val());
    State.loadUsers(users);
  });

  return State;
});
