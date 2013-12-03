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
  instructionText.justification = 'left';
  instructionText.style = {fontSize: '50px'};
  instructionText.fillColor = 'white';

  Renderer.renderInstruction = function(shape) {
    instructionText.content = shape ? shape.toString() : '';
  };

  var scoreText = new PointText(new Point(50, 250));
  scoreText.justification = 'left';
  scoreText.style = {fontSize: '50px'};
  scoreText.fillColor = 'white';

  Renderer.renderScore = function(score) {
    scoreText.content = 'Score: ' + (_.isNumber(score) && !_.isNaN(score) ? score : '');
  };

  var timerText = new PointText(new Point(50, 350));
  timerText.justification = 'left';
  timerText.style = {fontSize: '50px'};
  timerText.fillColor = 'white';

  Renderer.renderTimer = function(time) {
    timerText.content = 'Time: ' + (time >= 0 ? time + ' s': '');
  };

  var userCountText = new PointText(new Point(50, 150));
  userCountText.justification = 'left';
  userCountText.style = {fontSize: '50px'};
  userCountText.fillColor = 'white';

  Renderer.renderUserCount = function(count) {
    userCountText.content = 'Users online: ' + count;
  };

  return Renderer;
});
