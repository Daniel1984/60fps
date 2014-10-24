(function() {
  'use strict';

  var PIXI = require('pixi.js');
  var Jimmy = require('../jimmy/main');
  var Ramp = require('../ramps/main');
  var GameOver = require('../game_over_scene/main');
  var Score = require('../score/main');
  var TwoPartRamp = require('../two_part_ramps/main');
  var Sound = require('../../../core/sound');
  var jimmy, game_over, ramps_count, score;
  
  function PlayScene() {
    PIXI.DisplayObjectContainer.call(this);

    var _this = this;
    var play_game_over_sound = false;
    var game_over_sound = new Sound('game_over');
    var break_sound = new Sound('break');
    var ramp_height = new Ramp().height;
    ramps_count = Math.ceil(GO.getHeight() / (ramp_height * 2));

    this.addJimmy = function() {
      jimmy = new Jimmy();
      jimmy.position.x = GO.getWidth() / 2 - jimmy.width / 2;
      jimmy.position.y = GO.getHeight();
      this.addChild(jimmy);
    };
    
    this.addRamps = function() { 
      for(var i = 1; i <= ramps_count; i++) { 
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

    this.addScore = function() {
      score = new Score();
      this.addChild(score);
    };
      
    this.addListeners = function() {
      document.addEventListener('keydown', jimmy.handleKeyDown);
      document.addEventListener('keyup', jimmy.handleKeyUp);
    };

    this.removeListeners = function() {
      document.removeEventListener('keydown', jimmy.handleKeyDown);
      document.removeEventListener('keyup', jimmy.handleKeyUp);
    };
    
    this.update = function() { 
      this.detectCollision();
      this.detectGameOver();
      this.moveObjects();
      this.updateChildren();
    };

    this.updateChildren = function() {
      for(var i = 0; i < this.children.length; i++) {
        this.children[i].update();
      } 
    };

    this.moveObjects = function() {
      if(jimmy.position.y <= (GO.getHeight() / 2) - jimmy.half_height) {
        this.moveRampsDown();
      } else if(jimmy.position.y > GO.getHeight()) {
        this.moveRampsUp();
        this.moveScoreUp();
        if(!play_game_over_sound) game_over_sound.play();
        play_game_over_sound = true;
      }
    };

    this.moveRampsDown = function() {
      for(var i = 0; i < ramps_count; i++) {
	      if(jimmy.vy < 0) this.children[i].position.y -= jimmy.vy; 
      }
    };
    
    this.moveRampsUp = function() {
      for(var i = 0; i < ramps_count; i++) {
	      this.children[i].position.y -= jimmy.vy; 
      }
    };

    this.moveScoreUp = function() {
      score.position.y -= jimmy.vy;
    };

    this.detectCollision = function() {
      for(var i = 0; i < ramps_count; i++) {
        var vx = jimmy.getCx() - this.children[i].getCx();
        var vy = jimmy.getCy() - this.children[i].getCy();
        // chw and chh === combined half widths and heights of jimmy and ramp
        var chw = jimmy.half_width + this.children[i].half_width;
        var chh = jimmy.half_height + this.children[i].half_height;
        if(Math.abs(vx) < chw && Math.abs(vy) < chh) {
          if(jimmy.getFy() - 4 >= this.children[i].position.y && jimmy.getFy() - 4 <= this.children[i].position.y + 10) {            
            if(jimmy.vy > 0) {
              if(this.children[i].brokenRampHit()) {
                this.breakRamp(this.children[i]);
              } else {
                jimmy.jump();
              }
            }
          }
        }
      }
    };

    this.breakRamp = function(el) {
      if(el.alpha === 0) return; // if ramp olready broken do nothing
      break_sound.play();
      el.alpha = 0;
      var two_part_ramp = new TwoPartRamp(el.currentFrame);
      two_part_ramp.position.y = el.position.y;
      two_part_ramp.position.x = el.position.x;
      this.addChild(two_part_ramp);
    };

    this.detectGameOver = function() {
      if(jimmy.position.y > GO.getHeight() * 2) {
        if(game_over.position.y > 0) game_over.position.y -= jimmy.vy;
      }
    };

    this.restartGame = function() {
      this.resetScore();
      this.children = [];
      this.removeListeners();
      this.addAssets();
      play_game_over_sound = false;
    };

    this.resetScore = function() { 
      GO.SCORE = 0;
    };

    this.addAssets = function() { 
      this.addRamps();
      this.addJimmy();
      this.addListeners();
      this.addGameOver();
      this.addScore(); 
    };

    this.addAssets();
  }

  PlayScene.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
  PlayScene.prototype.constructor = PlayScene; 
  module.exports = PlayScene; 

})();
