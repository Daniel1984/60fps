(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function LoadingScene() {
    PIXI.Graphics.call(this);
    this.beginFill(0x000000, 0.9);
    this.drawRect(0, 0, GO.getWidth(), GO.getHeight());
    this.endFill();

    this.addLoadingTxt = function() {
      var text = new PIXI.BitmapText("Loading...", { font: "30px font", align: "center" });
      text.position.x = GO.getWidth() / 2 - text.width / 2;
      text.position.y = GO.getHeight() / 2 - text.height / 2;
      this.addChild(text);
    };

		this.update = function() {};

		this.addLoadingTxt();
	}

  LoadingScene.prototype = Object.create(PIXI.Graphics.prototype);
  LoadingScene.prototype.constructor = LoadingScene; 
	module.exports = LoadingScene;

})();
