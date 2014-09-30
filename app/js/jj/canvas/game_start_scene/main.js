(function() {
  'use strict';

  var PIXI = require('pixi.js');
  var Ramp = require('../ramps/ramp');
  var Jimmy = require('../jimmy/main');

  function StartScene() {
    PIXI.DisplayObjectContainer.call(this);
    var ramp, jimmy;

    this.addRamp = function() {
      var ramp_texture = PIXI.Texture.fromFrame('LandPiece_LightGreen.png');
      ramp = new Ramp(ramp_texture,
        GO.getWidth() / 2 - ramp_texture.width / 2,
        GO.getHeight() - ramp_texture.height - 20
      );
      this.addChild(ramp);
    };

    this.addPlayTxt = function() {
      var text = new PIXI.BitmapText("Play", {font: "16px font"});
      text.x = GO.getWidth() / 2 - text.width / 2;
      text.y = GO.getHeight() - ramp.height + 7;
      this.addChild(text);
    };

    this.addWelcomeMsg = function() {
      var text = new PIXI.BitmapText(
        "HIT PLAY \n TO \n START THE GAME",
        { font: "16px font", align: "center" }
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
      for(var i = 0; i < this.children.length; i++) {
        if(typeof this.children[i].update === 'function') this.children[i].update();
      } 
    };
  }

  StartScene.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
  StartScene.prototype.constructor = StartScene; 
  module.exports = StartScene;
})();
