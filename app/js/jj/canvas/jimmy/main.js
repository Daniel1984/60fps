(function() {
  'use strict';

  var PIXI = require('pixi.js');
  var Sound = require('../../../core/sound');

  function Jimmy() {
		var _this = this;
    var jump_sound = new Sound('soft_jump');
    var spring_sound = new Sound('spring_jump');
    this.vy = -13;
    this.gravity = 0.2;
		this.killed = false;

    var max_vx = 6;
    var horizontal_drag = 0.1; // used to slow down horizontal movement
    var vx = 1; 
    var moving_left = false;
    var moving_right = false;
    var direction;
    var textures = [];
    var frames = [
      'CharacterLeft_Jump.png',
      'CharacterLeft_Standing.png',
      'CharacterLeft_Walk1.png',
      'CharacterLeft_Walk2.png',
      'CharacterRight_Jump.png',
      'CharacterRight_Standing.png',
      'CharacterRight_Walk1.png',
      'CharacterRight_Walk2.png'
    ];

    for(var i = 0; i < frames.length; i++) {
      textures.push(PIXI.Texture.fromFrame(frames[i]));
    }

    PIXI.MovieClip.call(this, textures);
    this.gotoAndStop(1);
    this.half_width = this.width / 2;
    this.half_height = this.height / 2;

    //get central x pos
    this.getCx = function() {
      return this.position.x + this.half_width;
    };

    //get central y pos
    this.getCy = function() {
      return this.position.y + this.half_height;
    };

    //het full y pos including height
    this.getFy = function() {
      return this.position.y + this.height;
    };

    this.getHy = function() {
      return this.position.y + this.height / 2;
    };

		this.moveLeft = function() {
      this.gotoAndStop(0);
      moving_left = true;
      direction = 'left';
		};

		this.moveRight = function() {
      this.gotoAndStop(4);
      moving_right = true;
      direction = 'right';
		};

		this.stopMoving = function() {
			moving_left = false;
			moving_right = false;
		};

		this.handleMcFrames = function(left_frame, right_frame) {
			if(direction === 'left') {
				this.gotoAndStop(left_frame);
			} else if (direction === 'right') {
				this.gotoAndStop(right_frame);
			}
		};

    this.jump = function() {
      jump_sound.play();
			this.handleMcFrames(0, 4);
      this.vy = -12;
    };

    this.shortJump = function() {
      this.vy = -9;
			this.handleMcFrames(0, 4);
    };

    this.longJump = function() {
			spring_sound.play();
      this.vy = -16;
    };

    this.update = function() {
      this.handleHorMove();
      this.stayInBounds();
      this.moveJimmy();
			if(this.vy > 0) this.handleMcFrames(1, 5);
    };

    this.handleHorMove = function() {
      if(moving_right === true) {
        this.position.x += vx;
        if(vx < max_vx) vx += this.gravity;
      } else if(moving_left === true) {
        this.position.x -= vx;
        if(vx < max_vx) vx += this.gravity;
      } else if(!moving_right && !moving_left) {
        if(vx > 1) {
          vx -= horizontal_drag;
          if(direction === 'left') {
            this.position.x -= vx;
          } else if(direction === 'right') {
            this.position.x += vx; 
          }
        } 
      }
    };

    this.stayInBounds = function() {
      if(this.position.x < -this.width) {
        this.position.x = GO.getWidth();
      } else if(this.position.x > GO.getWidth()) {
        this.position.x = -this.width;
      }
    };

    this.moveJimmy = function() {
      if(this.position.y >= (GO.getHeight() / 2) - this.half_height) {
        this.position.y += this.vy;
      } else if(this.vy >= 0) {
        this.position.y += this.vy;
      }
	    if(this.position.y < GO.getHeight() * 2) this.vy += this.gravity;
    };

  }

  Jimmy.prototype = Object.create(PIXI.MovieClip.prototype);
  Jimmy.prototype.constructor = Jimmy;
  module.exports = Jimmy;
})();
