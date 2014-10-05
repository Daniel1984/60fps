(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Jimmy() {
    var _this = this;
    var textures = [];
    this.gravity = 0.2;
    var max_vx = 6;
    var horizontal_drag = 0.1; // used to slow down horizontal movement
    var bounce_factor_up = -1;
    var bounce_factor_down = -0.3;
    var vx = 1;
    this.vy = -5;
    var moving_left = false;
    var moving_right = false;
    var direction;
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

    this.getCx = function() {
      return this.position.x + this.half_width;
    };

    this.getCy = function() {
      return this.position.y + this.half_height;
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
      this.vy = -8;
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

  }

  Jimmy.prototype = Object.create(PIXI.MovieClip.prototype);
  Jimmy.prototype.constructor = Jimmy;
  module.exports = Jimmy;
})();
