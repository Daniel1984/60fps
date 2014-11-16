var Score = require('./base/score');

function JimmyJumpScore() {
	Score.call(this, 'JimmyJumpScore');
}

JimmyJumpScore.prototype = Object.create(Score.prototype);
JimmyJumpScore.prototype.constructor = JimmyJumpScore;

module.exports = JimmyJumpScore;
