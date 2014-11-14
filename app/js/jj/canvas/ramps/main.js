(function() {
  'use strict';

  var PIXI = require('pixi.js');
	var Spring = require('../spring/main');	

  function Ramp(opt) {
		this.has_spring = false;
    this.vx = undefined;
    this.broken_ramps = [0,1,2,3,4,5];
    this.textures = [];
    this.frames = [
      'BrokenLandPiece_Green.png',
      'BrokenLandPiece_Gray.png',
      'BrokenLandPiece_Beige.png', 
      'BrokenLandPiece_Blue.png', 
      'BrokenLandPiece_Pink.png',        
      'BrokenLandPiece_Multicolored.png',
      
      'LandPiece_DarkGreen.png',         
      'LandPiece_LightGray.png',
      'LandPiece_LightBeige.png',        
      'LandPiece_DarkBlue.png',  
      'LandPiece_DarkPing.png',
      'LandPiece_DarkMulticolored.png'
    ];

    for(var i = 0; i < this.frames.length; i++) {
      this.textures.push(PIXI.Texture.fromFrame(this.frames[i]));
    }

		var spring;

    PIXI.MovieClip.call(this, this.textures);
    this.position.x = Math.random() * (GO.getWidth() - this.width);
    this.half_width = this.width / 2;
    this.half_height = this.height / 2;

    this.setDifficulty = function() {
      if(GO.SCORE < 50) {
        this.difficulty = [0,6,6,6,6,6];
      } else if(GO.SCORE >= 50 && GO.SCORE < 100) {
        this.difficulty = [1,7,7,7,7,7];
      } else if(GO.SCORE >= 100 && GO.SCORE < 150) {
        this.difficulty = [2,8,8,2,8,8];
      } else if(GO.SCORE >= 150 && GO.SCORE < 200) {
        this.difficulty = [3,9,3,9,3,9];
      } else if(GO.SCORE >= 200 && GO.SCORE < 250) {
        this.difficulty = [4,10,4,10,4,10];
      } else if(GO.SCORE >= 250 && GO.SCORE < 300) {
        this.difficulty = [5,11,5,11,5,11];
      } else {
        this.difficulty = [5,5,5,11,5,5];
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

		this.removeSpring = function() {
			if(this.has_spring) {
				this.has_spring = false;
				this.removeChild(spring);
			}
		};

		this.addSpring = function() {
			if(GO.SCORE !== 0 && GO.SCORE % 10 === 0 && !this.brokenRamp()) {
				this.has_spring = true;
				spring = new Spring();
				spring.position.y = -spring.height;
				spring.position.x = this.width / 2 - spring.width / 2;
				this.addChild(spring);
			}
		};

    this.update = function() {
			var delta = 0;
			if(this.has_spring) {
				delta = spring.height;
			}
	    if(this.position.y > GO.getHeight() + delta) { 
        this.setDifficulty();
        this.changeTexture();
        this.randomizeVx();
        this.repositionRamp();
        this.addScore(); 
        this.randomizeVx();
				this.removeSpring();	
				this.addSpring();
        this.alpha = 1;
	    }
      this.horFloat();
    };

    this.changeTexture = function() {
      // the trick here is not to allow 2 broken ramps in a row
      var texture = this.difficulty[Math.floor(Math.random() * this.difficulty.length)];
      if(GO.PREV_RAMP_WAS_BROKEN) {
        do {
          texture = this.difficulty[Math.floor(Math.random() * this.difficulty.length)];
        } while(this.broken_ramps.indexOf(texture) !== -1);
        GO.PREV_RAMP_WAS_BROKEN = false;
      } else if(this.broken_ramps.indexOf(texture) !== -1) {
        GO.PREV_RAMP_WAS_BROKEN = true;
      }
      this.gotoAndStop(texture);
    };

    this.repositionRamp = function() {
      this.position.y = -this.height;
      this.position.x = Math.random() * (GO.getWidth() - this.width);
    };

    this.addScore = function() {
      GO.SCORE += 1;
      if(GO.SCORE > GO.TOP_SCORE) GO.TOP_SCORE = GO.SCORE;
    };

    this.brokenRamp = function() {
      return this.broken_ramps.indexOf(this.currentFrame) === -1 ? false : true;
    };

    this.horFloat = function() {
      if(this.currentFrame === 6 || this.currentFrame === 7) return;
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
