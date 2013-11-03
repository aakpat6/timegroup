/**
 * game.js: Main game loop.
 */

// Run before any modules can reference paper variables.
paper.install(window);
paper.setup('canvas');

define(function(require) {
  'use strict';

  var Comm = require('comm');

  var Game = {};

  Game.start = function() {
    Game.text = new PointText(new Point(300, 50));
    Game.text.justification = 'center';
    Game.text.style = {fontSize: 20};
    Game.text.fillColor = 'black';
  };

  Game.loop = function(e) {
    Game.text.content = Comm.count;
  };

  tool.onMouseDown = function(event) {
    Comm.setCount(Comm.count + 1);
  };

  view.onFrame = _.bind(Game.loop, Game);

  return Game;
});
