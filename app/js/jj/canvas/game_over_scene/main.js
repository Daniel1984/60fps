(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function GameOverScene() {
    PIXI.DisplayObjectContainer.call(this);
    var _this = this;
    var score;

    this.addGameOverTxt = function() {
      var text = new PIXI.BitmapText("GAME OVER", { font: "30px font", align: "center" });
      text.position.x = GO.getWidth() / 2 - text.width / 2;
      text.position.y = GO.getHeight() / 4 - text.height / 2;
      this.addChild(text);
    };

    this.addScore = function() {
      if(score) this.removeChild(score);
      score = new PIXI.BitmapText("SCORE: " + GO.SCORE + "\n TOP SCORE: " + GO.TOP_SCORE, 
        { font: "20px font", align: "center" }
      );
      score.position.x = GO.getWidth() / 2 - score.width/ 2;
      score.position.y = GO.getHeight() / 2 - score.height / 2;
      this.addChild(score);
    };
    
    this.addRestartTxt = function() {
      var text = new PIXI.BitmapText("RESTART", { font: "26px font" });
      text.x = GO.getWidth() / 2 - text.width / 2;
      text.y = GO.getHeight() - GO.getHeight() / 4 - text.height / 2;
      text.setInteractive(true);
      text.mousedown = text.touchstart = function() { 
        _this.parent.restartGame();
      };
      this.addChild(text);
    };

    this.update = function() {
      this.addScore();
    };

    this.addGameOverTxt();
    this.addRestartTxt();
    
  }

  GameOverScene.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
  GameOverScene.prototype.constructor = GameOverScene; 
  module.exports = GameOverScene;

})();
