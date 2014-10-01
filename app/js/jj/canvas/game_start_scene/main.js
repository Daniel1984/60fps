(function() {
  'use strict';

  var PIXI = require('pixi.js');
  var Ramp = require('../ramps/ramp');
  var Jimmy = require('../jimmy/main');

  function StartScene() {
    PIXI.DisplayObjectContainer.call(this);
    var ramp, jimmy, _this = this;

    this.addRamp = function() {
      var ramp_texture = PIXI.Texture.fromFrame('LandPiece_LightMulticolored.png');
      ramp = new Ramp(ramp_texture,
        GO.getWidth() / 2 - ramp_texture.width / 2,
        GO.getHeight() - ramp_texture.height * 2.5
      );
      this.addChild(ramp);
    };

    this.addPlayTxt = function() {
      var text = new PIXI.BitmapText("PLAY", {font: "26px font"});
      text.x = GO.getWidth() / 2 - text.width / 2;
      text.y = GO.getHeight() - ramp.height;
      text.setInteractive(true);
      text.mousedown = text.touchstart = function() { 
        _this.parent.parent.startGameScene();
        _this.parent.removeChild(_this);
      };
      this.addChild(text);
    };

    this.addWelcomeMsg = function() {
      var text = new PIXI.BitmapText(
        "WELCOME \nTO \nDANNY JUMP",
        { font: "26px font", align: "center" }
      );
      text.position.x = GO.getWidth() / 2 - text.width / 2;
      text.position.y = text.height;
      this.addChild(text);
    };

    this.addJimmy = function() {
      jimmy = new Jimmy();
      jimmy.position.x = GO.getWidth() / 2 - jimmy.width / 2;
      jimmy.position.y = GO.getHeight() / 2 - jimmy.height / 2;
      this.addChild(jimmy);
    };

    this.addRamp();
    this.addPlayTxt();
    this.addWelcomeMsg(); 
    this.addJimmy();

    this.update = function() {
      this.jimmyJump();
    };

    this.jimmyJump = function() {
      jimmy.position.y += jimmy.vy;
      jimmy.vy += jimmy.gravity;
      if(jimmy.position.y >= ramp.position.y - jimmy.height + 10) {
        jimmy.shortJump();
      }
    };
  }

  StartScene.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
  StartScene.prototype.constructor = StartScene; 
  module.exports = StartScene;
})();
