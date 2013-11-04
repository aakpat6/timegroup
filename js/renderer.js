/**
 * renderer.js: Renders objects for the game.
 */

define(function(require) {
  'use strict';

  var Renderer = {};

  Renderer.renderShapes = function(shapes, callback) {
    if (!shapes) return;

    var width = view.bounds.width;
    var height = view.bounds.height;

    var paths = [];

    for (var i = 0; i < shapes.length; i++) {
      shapes[i].draw(callback);
    }
  };

  var instructionText = new PointText(new Point(50, 50));

  Renderer.renderInstruction = function(shape) {
    if (!shape) return;

    instructionText.justification = 'left';
    instructionText.style = {fontSize: '50px'};
    instructionText.fillColor = 'white';
    instructionText.content = shape.kind;
  };

  return Renderer;
});
