(function() {
  'use strict';

  var PIXI = require('pixi.js');
  var Jimmy = require('../jimmy/main');
  var Ramp = require('../ramps/main');
  var GameOver = require('../game_over_scene/main');
  var Score = require('../score/main');
  var Hearth = require('../hearth/main');
  var TwoPartRamp = require('../two_part_ramps/main');
  var Sound = require('../../../core/sound'); 
  var jimmy, game_over, ramps_count, score, hearth;
  
  function PlayScene() {
    PIXI.DisplayObjectContainer.call(this);

    var _this = this;
    var play_game_over_sound = false;
    var hearth_enemy_added = false;

    var game_over_sound = new Sound('game_over');
    var break_sound = new Sound('break');

    var ramp_height = new Ramp().height;
    var optimum_ramp_space = Math.floor(GO.getHeight() - ramp_height * 5); 
    ramps_count = GO.RAMPS_COUNT =  Math.floor(GO.getHeight() / (ramp_height * 2));
    var gap_between_ramps = Math.floor(optimum_ramp_space / (ramps_count - 2));

    this.addJimmy = function() {
      jimmy = new Jimmy();
      jimmy.position.x = GO.getWidth() / 2 - jimmy.width / 2;
      jimmy.position.y = GO.getHeight();
      this.addChild(jimmy);
    };
    
    this.addRamps = function() { 
      for(var i = 1; i <= ramps_count; i++) { 
        var ramp = new Ramp(), posY;
        if(i === 1) { posY = GO.getHeight() - ramp.height; } 
        else if(i === ramps_count) { posY = ramp.height; }
        else { posY = GO.getHeight() - (gap_between_ramps * i); }
        ramp.position.y = Math.floor(posY);
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
      //this.addHearthEnemy();
      this.jimmyRampCollide();
      this.detectGameOver();
      this.moveObjects();
      this.updateChildren();
    };

    this.addHearthEnemy = function() {
      if(GO.SCORE !== 0 && GO.SCORE % 5 === 0 && !hearth_enemy_added) {
        hearth_enemy_added = true;
        hearth = new Hearth();
        this.addChild(hearth);
      }
    };

    this.updateChildren = function() {
      for(var i = 0; i < this.children.length; i++) {
        this.children[i].update();
      } 
    };

    this.moveObjects = function() {
      if(jimmy.position.y <= (GO.getHeight() / 2) - jimmy.half_height) {
        this.moveRampsDown();
        this.moveHearthDown();
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

    this.moveHearthDown = function() {
      if(hearth_enemy_added) {
        hearth.position.y -= jimmy.vy;
        if(hearth.position.y > GO.getHeight()) {
          hearth_enemy_added = false;
          this.removeChild(hearth);
        }
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

    this.jimmyRampCollide = function() {
      for(var i = 0; i < ramps_count; i++) {
        var vx = jimmy.getCx() - this.children[i].getCx();
        var vy = jimmy.getCy() - this.children[i].getCy();
        // chw and chh === combined half widths and heights of jimmy and ramp
        var chw = jimmy.half_width + this.children[i].half_width;
        var chh = jimmy.half_height + this.children[i].half_height;
        if(Math.abs(vx) < chw && Math.abs(vy) < chh) {
          if(jimmy.getFy() - 4 >= this.children[i].position.y && jimmy.getFy() - 4 <= this.children[i].position.y + 10) {            
            if(jimmy.vy > 0) {
              if(this.children[i].brokenRampHit()) { this.breakRamp(this.children[i]); }
              else { jimmy.jump(); }
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
      GO.SCORE = 0;
      this.children = [];
      this.removeListeners();
      this.addAssets();
      play_game_over_sound = false;
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
