(function() {
  'use strict';

  var PIXI = require('pixi.js');
  var Jimmy = require('../jimmy/main');
  var ramps_manager = require('../ramps/manager');
  var jimmy, ramps;
  var initial_jump = true;
  
  function PlayScene() {
    PIXI.DisplayObjectContainer.call(this);
    
    this.addJimmy = function() {
      jimmy = new Jimmy();
      jimmy.position.x = GO.getWidth() / 2 - jimmy.width / 2;
      jimmy.position.y = GO.getHeight();
      this.addChild(jimmy);
    };
    
    this.addRamps = function() {
      ramps = ramps_manager.getRamps({texture: 'LandPiece_DarkGreen.png', count: 5});
      for(var i = 0; i < ramps.length; i++) {
        ramps[i].position.x = Math.random() * GO.getWidth();
        ramps[i].position.y = Math.random() * GO.getHeight();
        this.addChild(ramps[i]);
      }
    };
      
    this.setupInteraction = function() {
      document.addEventListener('keydown', jimmy.handleKeyDown);
      document.addEventListener('keyup', jimmy.handleKeyUp);
    };
    
    this.update = function() {
      this.updateChildren();
      this.jimmyJump();
      this.detectCollision();
    };

    this.updateChildren = function() {
      for(var i = 0; i < this.children.length; i++) {
        this.children[i].update();
      } 
    };

    this.detectCollision = function() {
      for(var i = 0; i < ramps.length; i++) {
        var vx = jimmy.getCx() - ramps[i].getCx();
        var vy = jimmy.getCy() - ramps[i].getCy();
        var combined_half_widths = jimmy.half_width + ramps[i].half_width;
        var combined_half_heights = jimmy.half_height + ramps[i].half_height;
        if(Math.abs(vx) < combined_half_widths) {
          if(Math.abs(vy) < combined_half_heights) {
            jimmy.jump();
          }
        }
      }      
    };

    this.jimmyJump = function() {
      jimmy.position.y += jimmy.vy;
      jimmy.vy += jimmy.gravity;
      if(jimmy.position.y >= GO.getHeight() - jimmy.height + 10) {
        jimmy.jump();
      }
    };

    this.addRamps();
    this.addJimmy();
    this.setupInteraction();
  }

  PlayScene.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
  PlayScene.prototype.constructor = PlayScene; 
  module.exports = PlayScene; 

})();
