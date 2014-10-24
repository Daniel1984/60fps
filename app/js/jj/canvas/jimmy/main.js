(function() {
  'use strict';

  var PIXI = require('pixi.js');
  var Sound = require('../../../core/sound');

  function Jimmy() { 
    var jump_sound = new Sound('soft_jump');
    this.vy = -10;
    this.gravity = 0.2;

    var _this = this;
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

    this.handleKeyDown = function(e) {
      switch(e.keyCode) {
        case 37:
          _this.gotoAndStop(0);
          moving_left = true;
          direction = 'left';
          break;
        case 39:
          _this.gotoAndStop(4);
          moving_right = true;
          direction = 'right';
          break;
        default:
          break;
      }
    };

    this.handleKeyUp = function(e) {
      switch(e.keyCode) {
        case 37:
          _this.gotoAndStop(1);
          moving_left = false;
          break;
        case 39:
          _this.gotoAndStop(5);
          moving_right = false;
          break;
        default:
          break;
      }
    };

    this.jump = function() {
      jump_sound.play();
      this.vy = -11;
    };

    this.shortJump = function() {
      this.vy = -6;
    };

    this.longJump = function() {
      this.vy = -16;
    };

    this.update = function() {
      this.handleHorMove();
      this.stayInBounds();
      this.moveJimmy();
    };

    this.handleHorMove = function() {
      if(moving_right) {
        this.position.x += vx;
        if(vx < max_vx) vx += this.gravity;
      } else if(moving_left) {
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
