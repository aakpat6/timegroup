/**
 * shape.js: Definition of the shape class.
 */

define(function(require) {
  var Shape = function(features) {
    console.log(features);
    this.kind = features.kind;
    this.color = features.color;
    this.path = null;
  };

  Shape.prototype.draw = function(callback) {
    if (this.path) return;

    var drawTriangle = function(center, len) {
      var triangle = new Path.RegularPolygon(center, 3, len);
      return triangle;
    };

    var drawCircle = function(center, radius) {
      var circle = new Path.Circle(center, radius * 0.8);
      return circle;
    };

    var drawSquare = function(center, len) {
      var square = new Path.RegularPolygon(center, 4, len);
      return square;
    };

    var width = view.bounds.width;
    var height = view.bounds.height;
    var p = new Point(Math.random() * (width - 200) + 100,
                      Math.random() * (height - 200) + 100);
    if (this.kind === 'triangle') {
      this.path = drawTriangle(p, 100);
    } else if (this.kind === 'circle') {
      this.path = drawCircle(p, 100);
    } else if (this.kind === 'square') {
      this.path = drawSquare(p, 100);
    }

    var self = this;
    this.path.fillColor = this.color;
    this.path.onClick = function() {
      callback(self);
    };

  };

  Shape.prototype.toString = function() {
    return this.color + ' ' + this.kind;
  };

  return Shape;
});
