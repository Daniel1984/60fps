(function() {
  'use strict';

  var PIXI = require('pixi.js');
  var Jimmy = require('../jimmy/main');
  var Ramp = require('../ramps/main');
  var GameOver = require('../game_over_scene/main');
  var jimmy, game_over, ramps_count = 10;
  
  function PlayScene() {
    PIXI.DisplayObjectContainer.call(this);
    var _this = this;

    this.addJimmy = function() {
      jimmy = new Jimmy();
      jimmy.position.x = GO.getWidth() / 2 - jimmy.width / 2;
      jimmy.position.y = GO.getHeight();
      this.addChild(jimmy);
      jimmy.jump();
    };
    
    this.addRamps = function() { 
      for(var i = 0; i < ramps_count; i++) { 
        var ramp = new Ramp();
        ramp.position.y = GO.getHeight() - (ramp.height * 2) * i;
        this.addChild(ramp);
      }
    };

    this.addGameOver = function() {
      game_over = new GameOver();
      game_over.position.y = GO.getHeight();
      this.addChild(game_over);
    };
      
    this.setupInteraction = function() {
      document.addEventListener('keydown', jimmy.handleKeyDown);
      document.addEventListener('keyup', jimmy.handleKeyUp);
    };
    
    this.update = function() {
      this.updateChildren();
      this.moveRamps(); 
      this.detectCollision();
      this.detectGameOver();
    };

    this.updateChildren = function() {
      for(var i = 0; i < this.children.length; i++) {
        this.children[i].update();
      } 
    };

    this.moveRamps = function() {
      if(jimmy.position.y <= (GO.getHeight() / 2) - jimmy.half_height) {
        this.moveRampsDown();
      } else if(jimmy.position.y > GO.getHeight()) {
        this.moveRampsUp();
      }
    };

    this.moveRampsDown = function() {
      for(var i = 0; i < this.children.length; i++) {
        if(!(this.children[i] instanceof Ramp)) return;
	      if(jimmy.vy < 0) this.children[i].position.y -= jimmy.vy; 
      }
    };
    
    this.moveRampsUp = function() {
      for(var i = 0; i < this.children.length; i++) {
        if(!(this.children[i] instanceof Ramp)) return;
	      this.children[i].position.y -= jimmy.vy; 
      }
    };

    this.detectCollision = function() {
      for(var i = 0; i < this.children.length; i++) {
        if(!(this.children[i] instanceof Ramp)) return;
        var vx = jimmy.getCx() - this.children[i].getCx();
        var vy = jimmy.getCy() - this.children[i].getCy();
        // chw and chh === combined half widths and heights of jimmy and ramp
        var chw = jimmy.half_width + this.children[i].half_width;
        var chh = jimmy.half_height + this.children[i].half_height;
        if(Math.abs(vx) < chw) {
          if(Math.abs(vy) < chh) {
            if(jimmy.getFy() - 5 > this.children[i].position.y && jimmy.getFy() - 5 <= this.children[i].position.y + 10) {
              if(jimmy.vy > 0) jimmy.jump();
            }
          }
        }
      }
    };

    this.detectGameOver = function() {
      if(jimmy.position.y > GO.getHeight() * 2) {
        if(game_over.position.y > 0) game_over.position.y -= jimmy.vy;
      }
    };

    this.addRamps();
    this.addJimmy();
    this.setupInteraction();
    this.addGameOver();
  }

  PlayScene.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
  PlayScene.prototype.constructor = PlayScene; 
  module.exports = PlayScene; 

})();
