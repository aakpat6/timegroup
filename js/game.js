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

  var Game = {};

  Game.start = function() {
    // var width = view.bounds.width;
    // var height = view.bounds.height;
    // Game.text = new PointText(new Point(width / 2, height / 2));
    // Game.text.justification = 'center';
    // Game.text.style = {fontSize: '70px'};
    // Game.text.fillColor = 'white';
  };

  Game.loop = function(e) {
    // Game.text.content = State.count;
    Renderer.renderShapes(State.shapes);
  };

  tool.onMouseDown = function(event) {
    // State.incrementCount();
  };

  view.onFrame = _.bind(Game.loop, Game);

  return Game;
});
