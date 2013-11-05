/**
 * renderer.js: Renders objects for the game.
 */

define(function(require) {
  'use strict';

  var Renderer = {};

  Renderer.renderShapes = function(shapes, callback) {
    _.forEach(shapes, function(s) {
      s.draw(callback);
    });
  };

  var instructionText = new PointText(new Point(50, 50));

  Renderer.renderInstruction = function(shape) {
    instructionText.justification = 'left';
    instructionText.style = {fontSize: '50px'};
    instructionText.fillColor = 'white';
    instructionText.content = shape ? shape.toString() : '';
  };

  var userCountText = new PointText(new Point(50, 150));

  Renderer.renderUserCount = function(count) {
    userCountText.justification = 'left';
    userCountText.style = {fontSize: '50px'};
    userCountText.fillColor = 'white';
    userCountText.content = 'Users online: ' + count;
  };

  return Renderer;
});
