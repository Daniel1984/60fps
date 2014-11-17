(function() {
  'use strict';

  var PIXI = require('pixi.js');
  var Jimmy = require('../jimmy/main');
  var Ramp = require('../ramps/main');
  var GameOver = require('../game_over_scene/main');
  var Score = require('../score/main');
  var TwoPartRamp = require('../two_part_ramps/main');
  var Sound = require('../../../core/sound'); 
	var enemies = {
    hearth: require('../hearth/main'),
    cloud: require('../cloud/main')
	};
  var jimmy, game_over, ramps_count, score, enemy;
  
  function PlayScene() {
    PIXI.DisplayObjectContainer.call(this);

    var _this = this;  
    var enemy_added = false;
		var play_game_over_sound = false;
    var break_sound = new Sound('break');
		var game_over_sound = new Sound('aww');
    var ramp_height = new Ramp().height;
    var optimum_ramp_space = Math.floor(GO.getHeight() - ramp_height * 5); 
    ramps_count = GO.RAMPS_COUNT =  Math.floor(GO.getHeight() / (ramp_height * 2));
    var gap_between_ramps = Math.floor(optimum_ramp_space / (ramps_count - 2));

    this.hitArea = new PIXI.Rectangle(0, 0, GO.getWidth(), GO.getHeight());
		this.interactive = true;

		this.handleTouchStart = function(e) {
			if(e.getLocalPosition(_this).x > GO.getWidth() / 2) {
				jimmy.moveRight();
			} else {
				jimmy.moveLeft();
			}
		};

		this.handleTouchEnd = function() {
			jimmy.stopMoving();
		};

		this.mousedown = this.touchstart = _this.handleTouchStart;
		this.mouseup = this.touchend = _this.handleTouchEnd;

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
      
    this.update = function() { 
      this.addEnemy('hearth');
			this.addEnemy('cloud');
			if(!jimmy.killed) {
      	this.detectJimmyAndRampCollision();
				this.detectJimmyAndEnemyCollision();
			}
      this.detectGameOver();
      this.moveObjects();
      this.updateChildren();
    };

    this.addEnemy = function(name) {
			var frequency = name === 'hearth' ? 30 : 15;
      if(GO.SCORE !== 0 && GO.SCORE % frequency === 0 && !enemy_added) {
        enemy_added = true;
        enemy = new enemies[name]();
        this.addChild(enemy);
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
        this.moveEnemyDown();
      } else if(jimmy.position.y > GO.getHeight()) {
        this.moveRampsUp();
        this.moveScoreUp();
				this.moveEnemyUp();
        if(!play_game_over_sound && !jimmy.killed) game_over_sound.play();
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

    this.moveEnemyDown = function() {
      if(enemy_added) {
        if(jimmy.vy < 0) enemy.position.y -= jimmy.vy;
        if(enemy.position.y > GO.getHeight()) {
          enemy_added = false;
        }
      }
    };

    this.moveEnemyUp = function() {
      if(enemy_added) {
        enemy.position.y -= jimmy.vy;
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

		this.detectCollision = function(obj_1, obj_2, cb) {
      var vx = obj_1.getCx() - obj_2.getCx();
      var vy = obj_1.getCy() - obj_2.getCy();
      // chw and chh === combined half widths and heights of obj_1 and obj_2
      var chw = obj_1.half_width + obj_2.half_width - 10;
      var chh = obj_1.half_height + obj_2.half_height - 10;
      if(Math.abs(vx) < chw && Math.abs(vy) < chh) {
				this[cb](obj_1, obj_2, vx, vy);
      }
		};

    this.detectJimmyAndRampCollision = function() {
      for(var i = 0; i < ramps_count; i++) {
				this.detectCollision(jimmy, this.children[i], 'manageJimmyAndRampCollision');
      }
    };

		this.manageJimmyAndRampCollision = function(jimmy, ramp) {
      if(jimmy.getFy() >= ramp.position.y && jimmy.getFy() <= ramp.position.y + 20 && jimmy.vy > 0) {
      	if(ramp.brokenRamp()) this.breakRamp(ramp);	
				else if(ramp.has_spring) jimmy.longJump();
				else jimmy.jump();
     	}
		};

		this.detectJimmyAndEnemyCollision = function() {
			if(enemy_added) this.detectCollision(jimmy, enemy, 'manageJimmyAndEnemyCollision');
		};

		this.manageJimmyAndEnemyCollision = function(jimmy, enemy, vx, vy) {
      if(jimmy.getFy() >= enemy.position.y && jimmy.getFy() <= enemy.position.y + 20 && jimmy.vy > 0) {
				jimmy.jump();
				GO.SCORE += 10;
				GO.TOP_SCORE += 10;
				enemy.kill();
     	} else {
				jimmy.killed = true;
				game_over_sound.play();
			}
    };

    this.breakRamp = function(el) {
      if(el.alpha === 0) return; // if ramp olready broken do nothing
			jimmy.shortJump();
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
      play_game_over_sound = false;
      enemy_added = false;
			jimmy.killed = false;
			this.removeChildren();
      this.addAssets();
    };

    this.addAssets = function() { 
      this.addRamps();
      this.addJimmy(); 
      this.addGameOver();
      this.addScore();
    };

    this.addAssets();
  }

  PlayScene.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
  PlayScene.prototype.constructor = PlayScene; 
  module.exports = PlayScene; 

})();
