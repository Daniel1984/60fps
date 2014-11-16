var Score = require('./base/score');

function FlappyPlaneScore() {
	Score.call(this, 'Score');
}

FlappyPlaneScore.prototype = Object.create(Score.prototype);
FlappyPlaneScore.prototype.constructor = FlappyPlaneScore;

module.exports = FlappyPlaneScore;
