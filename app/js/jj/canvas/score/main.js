(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function GameScore() {
    PIXI.DisplayObjectContainer.call(this);
    var _this = this;
    var text;

    this.addScore = function() {
      if(text) this.removeChild(text);
      text = new PIXI.BitmapText("SCORE: " + GO.SCORE, { font: "20px font", align: "center" });
      text.position.x = 10;
      text.position.y = 5;
      this.addChild(text);
    };

    this.update = function() {
      this.addScore();
    };

  }

  GameScore.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
  GameScore.prototype.constructor = GameScore; 
  module.exports = GameScore;

})();
