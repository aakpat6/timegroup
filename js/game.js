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
    Game.reloadInstruction();
  };

  Game.loop = function() {
    Renderer.renderInstruction(State.currentInstruction);
    Renderer.renderShapes(State.shapes, function(shape) {
      if (shape.kind === State.currentInstruction.kind) {
        Game.reloadInstruction();
      }
    });
  };

  Game.reloadInstruction = function() {
    State.currentInstruction = Util.randElem(State.shapes);
  };

  view.onFrame = _.bind(Game.loop, Game);
  return Game;
});
