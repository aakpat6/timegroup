/*
 * game.js: Main game loop.
 */

// paperjs has to have this run before
// any modules can reference paper variables
paper.install(window);
paper.setup('canvas');

define(function(require) {
  'use strict';

  var firebase = new Firebase('https://timegroup.firebaseio.com/count');

  var Game = {
    count: 0
  };

  Game.start = function() {
    Game.text = new PointText(new Point(300, 50));
    Game.text.justification = 'center';
    Game.text.style = {fontSize: 20};
    Game.text.fillColor = 'black';
  };

  Game.loop = function(e) {
    Game.text.content = Game.count;
  };

  firebase.on('value', function(snapshot) {
    Game.count = snapshot.val();
  });

  tool.onMouseDown = function(event) {
    Game.count++;
    firebase.set(Game.count);
  };

  view.onFrame = _.bind(Game.loop, Game);
  
  return Game;
});
