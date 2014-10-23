(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Ramp(opt) {
    this.vx = undefined;
    this.broken_ramps = [0,1,2,3,4];
    this.healthy_ramps = [5,6,7,8,9];
    this.textures = [];
    this.frames = [
      'BrokenLandPiece_Blue.png',
      'BrokenLandPiece_Gray.png',
      'BrokenLandPiece_Green.png',
      'BrokenLandPiece_Multicolored.png',
      'BrokenLandPiece_Pink.png',

      'LandPiece_DarkBlue.png',
      'LandPiece_DarkGreen.png',
      'LandPiece_DarkMulticolored.png',
      'LandPiece_DarkPing.png',
      'LandPiece_LightGray.png'
    ];

    for(var i = 0; i < this.frames.length; i++) {
      this.textures.push(PIXI.Texture.fromFrame(this.frames[i]));
    }

    PIXI.MovieClip.call(this, this.textures);
    this.position.x = Math.random() * (GO.getWidth() - this.width);
    this.half_width = this.width / 2;
    this.half_height = this.height / 2;

    this.getCx = function() {
      return this.position.x + this.half_width;
    };

    this.getCy = function() {
      return this.position.y + this.half_height;
    };

    this.randomizeVx = function() {
      this.vx = Math.random() * 3 - 1.5;
    };

    this.update = function() {
	    if(this.position.y > GO.getHeight()) { 
        this.changeTexture();
        this.randomizeVx();
        this.repositionRamp();
        this.addScore(); 
        this.randomizeVx();
        this.alpha = 1;
	    }
      this.horFloat();
    };

    this.changeTexture = function() {
     this.gotoAndStop(Math.floor(Math.random() * this.frames.length));
    };

    this.repositionRamp = function() {
	    this.position.y = this.position.y - (GO.getHeight() + (Math.random() + 100 - 20) + 20);
      this.position.x = Math.random() * (GO.getWidth() - this.width);
    };

    this.addScore = function() {
      GO.SCORE += 1;
      if(GO.SCORE > GO.TOP_SCORE) GO.TOP_SCORE = GO.SCORE;
    };

    this.brokenRampHit = function() {
      return this.broken_ramps.indexOf(this.currentFrame) === -1 ? false : true;
    };

    this.horFloat = function() {
      if(this.position.x <= 0 || this.position.x >= GO.getWidth() - this.width) this.vx *= -1;
      this.position.x += this.vx;
    };

    this.changeTexture();
    this.randomizeVx();

  }

  Ramp.prototype = Object.create(PIXI.MovieClip.prototype);
  Ramp.prototype.constructor = Ramp;
  module.exports = Ramp;

})();
