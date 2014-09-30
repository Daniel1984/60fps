(function() {
  'use strict';

  var PIXI = require('pixi.js'),
      Backdrop = require('../backdrop/main'),
      MessageBanner = require('../game_msg_banner/main'),
      Scores = require('../game_current_best_score/main'),
      GameControls = require('../game_over_controls/main');

  function GameOverScene() {
    PIXI.DisplayObjectContainer.call(this);
    this.width = FP.getWidth();
    this.height = FP.getHeight();
    this.addElements();
  }

  GameOverScene.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
  GameOverScene.prototype.constructor = GameOverScene;

  GameOverScene.prototype.addElements = function() {
    this.addBackdrop();
    this.addGameOverBanner();
    this.addScores();
    this.addGameControls();
  };

  GameOverScene.prototype.addBackdrop = function() {
    this.addChild(new Backdrop(0x000000, 0.8));
  };

  GameOverScene.prototype.addGameOverBanner = function() {
    this.addChild(new MessageBanner('textGameOver', { posY: 50 }));
  };

  GameOverScene.prototype.addScores = function() {
    var scores = new Scores();
    scores.position.y = Math.floor(FP.getHeight() / 2 - scores.height / 2);
    scores.position.x = Math.floor(FP.getWidth() / 2 - scores.width / 2);
    this.addChild(scores);
  };

  GameOverScene.prototype.addGameControls = function() {
    this.addChild(new GameControls());
  };

  GameOverScene.prototype.update = function() {};

  module.exports = GameOverScene;

})();
