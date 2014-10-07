(function() {
  'use strict';

  var PIXI = require('pixi.js');
  var Jimmy = require('../jimmy/main');
  var ramps_manager = require('../ramps/manager');
  var Ramp = require('../ramps/ramp');
  var jimmy, ramps;
  var initial_jump = true;
  
  function PlayScene() {
    PIXI.DisplayObjectContainer.call(this);
    var _this = this;

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
      this.moveJimmy(); 
      this.bounceFromGroundJimmy();
      this.detectCollision();
    };

    this.updateChildren = function() {
      for(var i = 0; i < this.children.length; i++) {
        this.children[i].update();
      } 
    };

    this.moveJimmy = function() {
      if(jimmy.position.y >= (GO.getHeight() / 2) - jimmy.half_height) {
        jimmy.position.y += jimmy.vy;
	      jimmy.vy += jimmy.gravity;
      } else {
        jimmy.vy += jimmy.gravity;
        ramps.forEach(function(p, i) {
	        if(jimmy.vy < 0) p.position.y -= jimmy.vy;
	        if(p.position.y > GO.getHeight()) {
	          p.position.y = p.position.y - (GO.getHeight() + (Math.random() + 100 - 20) + 20);
            p.position.x = Math.random() * (GO.getWidth() - p.width - p.width) + p.width;
	        }
        }); 
	      if(jimmy.vy >= 0) {
          jimmy.position.y += jimmy.vy;
	        jimmy.vy += jimmy.gravity;
	      }
      }
    };

    this.detectCollision = function() {
      for(var i = 0; i < ramps.length; i++) {
        var vx = jimmy.getCx() - ramps[i].getCx();
        var vy = jimmy.getCy() - ramps[i].getCy();
        // chw and chh === combined half widths and heights of jimmy and ramp
        var chw = jimmy.half_width + ramps[i].half_width;
        var chh = jimmy.half_height + ramps[i].half_height;
        if(Math.abs(vx) < chw) {
          if(Math.abs(vy) < chh) {
            if(jimmy.getFy() - 5 > ramps[i].position.y && jimmy.getFy() - 5 <= ramps[i].position.y + 10) {
              if(jimmy.vy > 0) jimmy.jump();
            }
          }
        }
      }
    };

    this.bounceFromGroundJimmy = function() {
      if(jimmy.position.y >= GO.getHeight() - jimmy.height + 10) {
        jimmy.longJump();
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
