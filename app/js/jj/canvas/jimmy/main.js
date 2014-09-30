(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Jimmy() {
    var _this = this;
    var textures = [];
    var gravity = 0.2;
    var max_vx = 6;
    var horizontal_drag = 0.05; // used to slow down horizontal movement
    var bounce_factor_up = -1;
    var bounce_factor_down = -0.3;
    var vx = 2;
    var vy = 1;
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

    this.update = function() {
      this.handleVertMove();
      this.handleHorMove();
      this.stayInBounds();
    };

    this.handleVertMove = function() {
      this.position.y += vy; 
      vy += gravity;
      if(this.position.y > GO.getHeight() - this.height) {
        this.position.y = Math.floor(GO.getHeight() - this.height);  
        vy *= bounce_factor_up;
      } else if(this.position.y < GO.getHeight() / 2 - this.height / 2) {
        this.position.y = Math.floor(GO.getHeight() / 2 - this.height / 2);
        vy *= bounce_factor_down;
      }
    };

    this.handleHorMove = function() {
      if(moving_right) {
        this.position.x += vx;
        if(vx < max_vx) vx += gravity;
      } else if(moving_left) {
        this.position.x -= vx;
        if(vx < max_vx) vx += gravity;
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
