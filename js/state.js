/**
 * state.js: Deals with communications with firebase and maintains game state.
 */

define(function(require) {
  'use strict';

  var State = {};

  var Util = require('util');
  var Shape = require('shape');
  var C = require('constants');
  State.timer = C.START_TIME;
  State.score = 0; 
  State.userId = Util.randString(C.UID_LEN);
  var time_interval;


  State.reloadInstruction = function() {
    if (!State.users) return;
    State.currentInstruction = Util.randElem(State.buckets[(State.userIdx ) % (State.users.length)]);
    if (State.currentInstruction) {
      userConnection.update({
        instruction: {
          kind: State.currentInstruction.kind,
          color: State.currentInstruction.color
        }
      }, function() {
        State.instructionToRender = new Shape(State.instructions[(State.userIdx + 1) % (State.instructions.length)]);
      });
    }
  };

  State.refreshInstruction = function() {
    State.instructionToRender = new Shape(State.instructions[(State.userIdx + 1) % (State.instructions.length)]);
  };

  State.loadUsers = function(users) {
    State.users = users;
    State.userIdx = _.indexOf(State.users, State.userId);
    _.forEach(State.shapes, function(s) {
      s.remove();
    });
    State.isHost = (State.userIdx === 0);
    if (State.isHost) {
      State.resetTimer();
      State.resetScore();
    }
    State.buckets = Util.makeBuckets(State.shapes, State.users.length);
    State.shapesToRender = State.buckets[State.userIdx];
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

  var timeRef = Util.connectFirebase('/timer');
  var scoreRef = Util.connectFirebase('/score');
  var userRef = Util.connectFirebase('/users');

  State.updateTimer = function() {
    State.timer = State.timer - 0.1;
    if ((State.timer <= 0) && (State.isHost)) {
      State.resetTimer();
    }
  };

  timeRef.on('value', function(snapshot) {
    State.timer = C.START_TIME;
  });

  var userConnection = userRef.push({
    id: State.userId
  });
  userConnection.onDisconnect().remove();

  userRef.on('value', function(snapshot) {
    var users = _.pluck(_.toArray(snapshot.val()), 'id');
    State.instructions = _.pluck(_.toArray(snapshot.val()), 'instruction');
    if (!State.users || _.contains(State.users, undefined) || users.length !== State.users.length) {
      State.loadUsers(users);
    }
    State.refreshInstruction();
  });

  time_interval = setInterval(State.updateTimer, 100);

  State.resetTimer = function() {
    timeRef.child('time').set(Util.randString(32));
  };

  State.updateScore = function(incr) {
    scoreRef.transaction(function(current_value) {
      return current_value + incr;
    });
  };

  State.resetScore = function() {
    scoreRef.set(0);
  };
  
  scoreRef.on('value', function(snapshot) {
    State.score = snapshot.val();
  });

  return State;
});
