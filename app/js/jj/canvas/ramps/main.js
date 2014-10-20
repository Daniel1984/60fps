(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Ramp(opt) {
    var types = [
      [],
      [],
      [],
      [],
      []
    ];
    // use movie clip instead and can use goToAndStop to change state of ramp!
    // also use pixi's currentFrame to know what state is ramp at
    var vx = Math.random() * (1 - 0.2) + 0.2;
    var texture = PIXI.Texture.fromFrame('LandPiece_DarkGreen.png');
    PIXI.Sprite.call(this, texture); 
    this.position.x = Math.random() * (GO.getWidth() - this.width);
    this.half_width = this.width / 2;
    this.half_height = this.height / 2;

    this.getCx = function() {
      return this.position.x + this.half_width;
    };

    this.getCy = function() {
      return this.position.y + this.half_height;
    };

    this.update = function() {
	    if(this.position.y > GO.getHeight()) { 
        this.changeTexture();
        this.repositionRamp();
        this.addScore(); 
	    }
      this.horFloat();
    };

    this.changeTexture = function() {

    };

    this.repositionRamp = function() {
	    this.position.y = this.position.y - (GO.getHeight() + (Math.random() + 100 - 20) + 20);
      this.position.x = Math.random() * (GO.getWidth() - this.width);
    };

    this.addScore = function() {
      GO.SCORE += 1;
      if(GO.SCORE > GO.TOP_SCORE) GO.TOP_SCORE = GO.SCORE;
    };

    this.horFloat = function() {
      if(this.position.x <= 0 || this.position.x >= GO.getWidth() - this.width) vx *= -1;
      this.position.x += vx;
    };

 }

  Ramp.prototype = Object.create(PIXI.Sprite.prototype);
  Ramp.prototype.constructor = Ramp;
  module.exports = Ramp;

})();
