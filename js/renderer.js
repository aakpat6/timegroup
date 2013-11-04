/**
 * renderer.js: Renders objects for the game.
 */

define(function(require) {
  'use strict';

  var Renderer = {};

  var drawTriangle = function(center, len) {
    var triangle = new Path.RegularPolygon(center, 3, len);
    triangle.fillColor = 'red';
  };

  var drawCircle = function(center, radius) {
    var circle = new Path.Circle(center, radius * 0.8);
    circle.fillColor = 'blue';
  };

  var drawSquare = function(center, len) {
    var square = new Path.RegularPolygon(center, 4, len);
    square.fillColor = 'green';
  };

  Renderer.renderShapes = function(shapes) {
    if (!shapes) return;

    var width = view.bounds.width;
    var height = view.bounds.height;

    for (var i = 0; i < shapes.length; i++) {
      var p = new Point(width/2 - 600 + (i*300), height / 2 - 100);
      if (shapes[i] === 'triangle') {
        drawTriangle(p, 100);
      } else if (shapes[i] === 'circle') {
        drawCircle(p, 100);
      } else if (shapes[i] === 'square') {
        drawSquare(p, 100);
      }
    }
  };

  return Renderer;
});
