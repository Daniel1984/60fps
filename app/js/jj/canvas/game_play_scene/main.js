(function() {
  'use strict';

  var PIXI = require('pixi.js');
  var Jimmy = require('../jimmy/main');
  var Ramp = require('../ramps/main');
  var jimmy, ramps_count = 6;
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
      for(var i = 0; i < ramps_count; i++) { 
        var ramp = new Ramp();
        ramp.position.y = GO.getHeight() - (ramp.height * 2) * i;
        console.log(ramp.position.y);
        this.addChild(ramp);
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
        this.children.forEach(function(p, i) {
          if(!(p instanceof Ramp)) return;
	        if(jimmy.vy < 0) p.position.y -= jimmy.vy;
	        if(p.position.y > GO.getHeight()) {
	          p.position.y = p.position.y - (GO.getHeight() + (Math.random() + 100 - 20) + 20);
            p.position.x = Math.random() * (GO.getWidth() - p.width);
	        }
        }); 
	      if(jimmy.vy >= 0) {
          jimmy.position.y += jimmy.vy;
	        jimmy.vy += jimmy.gravity;
	      }
      }
    };

    this.detectCollision = function() {
      this.children.forEach(function(c) {
        if(!(c instanceof Ramp)) return;
        var vx = jimmy.getCx() - c.getCx();
        var vy = jimmy.getCy() - c.getCy();
        // chw and chh === combined half widths and heights of jimmy and ramp
        var chw = jimmy.half_width + c.half_width;
        var chh = jimmy.half_height + c.half_height;
        if(Math.abs(vx) < chw) {
          if(Math.abs(vy) < chh) {
            if(jimmy.getFy() - 5 > c.position.y && jimmy.getFy() - 5 <= c.position.y + 10) {
              if(jimmy.vy > 0) jimmy.jump();
            }
          }
        }
      });
    };

    this.bounceFromGroundJimmy = function() {
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
