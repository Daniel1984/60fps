(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Ramp(opt) {
    this.vx = undefined;
    this.broken_ramps = [0,1,2,3,4];
    this.textures = [];
    this.frames = [
      'BrokenLandPiece_Blue.png',        // 0
      'BrokenLandPiece_Gray.png',        // 1
      'BrokenLandPiece_Green.png',       // 2
      'BrokenLandPiece_Pink.png',        // 3
      'BrokenLandPiece_Multicolored.png',// 4

      'LandPiece_DarkBlue.png',          // 5
      'LandPiece_DarkGreen.png',         // 6
      'LandPiece_DarkMulticolored.png',  // 7
      'LandPiece_DarkPing.png',          // 8
      'LandPiece_LightGray.png'          // 9
    ];

    for(var i = 0; i < this.frames.length; i++) {
      this.textures.push(PIXI.Texture.fromFrame(this.frames[i]));
    }

    PIXI.MovieClip.call(this, this.textures);
    this.position.x = Math.random() * (GO.getWidth() - this.width);
    this.half_width = this.width / 2;
    this.half_height = this.height / 2;

    this.setDifficulty = function() {
      if(GO.SCORE < 50) {
        this.difficulty = [2,6,6,6,6,6];
      } else if(GO.SCORE > 50 && GO.SCORE < 100) {
        this.difficulty = [1,9,9,9,9,9];
      } else if(GO.SCORE > 100 && GO.SCORE < 150) {
        this.difficulty = [0,5,5,5,5,5];
      } else if(GO.SCORE > 150 && GO.SCORE < 200) {
        this.difficulty = [3,8,8,8,8,8];
      } else if(GO.SCORE > 200 && GO.SCORE < 250) {
        this.difficulty = [4,7,7,7,7,7];
      } else {
        this.difficulty = [4,7,3,8,5,6];
      }
    };

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
        this.setDifficulty();
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
     this.gotoAndStop(this.difficulty[Math.floor(Math.random() * this.difficulty.length)]);
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
      if(this.currentFrame < 4) return;
      if(this.position.x <= 0 || this.position.x >= GO.getWidth() - this.width) this.vx *= -1;
      this.position.x += this.vx;
    };

    this.setDifficulty();
    this.changeTexture();
    this.randomizeVx();

  }

  Ramp.prototype = Object.create(PIXI.MovieClip.prototype);
  Ramp.prototype.constructor = Ramp;
  module.exports = Ramp;

})();
