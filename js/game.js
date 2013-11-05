/**
 * game.js: Main game loop.
 */

// Run before any modules can reference paper variables.
paper.install(window);
paper.setup('canvas');

define(function(require) {
  'use strict';

  var State = require('state');
  var Renderer = require('renderer');
  var Util = require('util');

  var Game = {};

  Game.start = function() {
    State.reloadInstruction();
  };

  Game.loop = function() {
    Renderer.renderInstruction(State.currentInstruction);
    Renderer.renderUserCount(State.users ? State.users.length : 0);
    Renderer.renderShapes(State.shapes, function(shape) {
      if (shape === State.currentInstruction) {
        State.reloadInstruction();
      }
    });
  };

  view.onFrame = _.bind(Game.loop, Game);
  return Game;
});
