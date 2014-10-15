(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function GameOverScene() {
    PIXI.DisplayObjectContainer.call(this);
    var _this = this;

    this.addGameOverTxt = function() {
      var text = new PIXI.BitmapText("GAME OVER", { font: "26px font", align: "center" });
      text.position.x = GO.getWidth() / 2 - text.width / 2;
      text.position.y = GO.getHeight() / 3;
      this.addChild(text);
    };

    
    this.addRestartTxt = function() {
      var text = new PIXI.BitmapText("RESTART", { font: "26px font" });
      text.x = GO.getWidth() / 2 - text.width / 2;
      text.y = GO.getHeight() - GO.getHeight() / 3;
      text.setInteractive(true);
      text.mousedown = text.touchstart = function() { 
        this.position.y = GO.getHeight();
      };
      this.addChild(text);
    };

    this.update = function() {};

    this.addGameOverTxt();
    this.addRestartTxt();
    
  }

  GameOverScene.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
  GameOverScene.prototype.constructor = GameOverScene; 
  module.exports = GameOverScene;

})();
