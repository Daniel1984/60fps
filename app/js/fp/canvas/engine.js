(function() {
  "use strict";
  
  var PIXI = require('pixi.js');
  var asset_loader = require('./asset_loader');
  var StartGameScene = require('./game_start_scene/main');
  var GameOverScene = require('./game_over_scene/main');
  var Clouds = require('./background/clouds');
  var Ground = require('./background/ground');
  var Rocks = require('./rocks/rocks_manager');
  var Plane = require('./planes/main');
  var Score = require('./game_score/main');
  var Puffs = require('./puffs/puffs_manager');

  var ads = require('../banner_adds/ads_m'); 

  var renderer;
  var canvas;
  var game_stage;
  
  function Main() {
    PIXI.Stage.call(this, 0x000000, true);
    this.mousedown = this.touchstart = this.onScreenTouch;
    this.mouseup = this.touchend = this.onScreenTouchEnd;
    this.setupCanvas();
    this.loadAssets();
    this.initGameLoop();
  }

  Main.prototype = Object.create(PIXI.Stage.prototype);
  Main.prototype.constructor = Main;

  Main.prototype.onScreenTouch = function() {
    FP.PLANE_FALLING = false;
  };

  Main.prototype.onScreenTouchEnd = function() {
    FP.PLANE_FALLING = true;
  };

  Main.prototype.setupCanvas = function() {
    if(FP.IS_NATIVE) {
      canvas = document.createElement('screencanvas');
      canvas.style.cssText="idtkscale:ScaleAspectFill;";
      canvas.width = FP.WW;
      canvas.height = FP.WH;
      document.body.appendChild(canvas);
      renderer = new PIXI.CanvasRenderer(FP.WW, FP.WH, canvas);
      game_stage = new PIXI.DisplayObjectContainer();
      ads.init(canvas.getContext("2d"));
    } else {
      renderer = PIXI.autoDetectRenderer(FP.getWidth(), FP.getHeight());
      game_stage = new PIXI.DisplayObjectContainer();
      //game_stage.scale.x = FP.WW / FP.getWidth();
      //game_stage.scale.y = FP.WH / FP.getHeight();
      document.body.appendChild(renderer.view);
    }
    this.addChild(game_stage);
  };

  Main.prototype.loadAssets = function() {
    asset_loader.onComplete = this.onDoneLoadingAssets.bind(this);
    asset_loader.load();
  };

  Main.prototype.onDoneLoadingAssets = function() {
    game_stage.addChild(new Clouds());
    var plane = new Plane();
    game_stage.addChild(plane);
    if(FP.IS_NATIVE) game_stage.addChild(new Puffs(plane));
    game_stage.addChild(new Rocks());
    game_stage.addChild(new Ground());
    
    var score = new Score();
    score.position.x = FP.getWidth() / 2 - score.width / 2;
    game_stage.addChild(score);

    game_stage.addChild(new StartGameScene());
  };

  Main.prototype.showGameOver = function() {
    game_stage.addChild(new GameOverScene());
  };

  Main.prototype.restartGame = function() {
    FP.PLANE_OBSTICLES = [];
    game_stage.children = [];
    this.onDoneLoadingAssets();
  };

  Main.prototype.initGameLoop = function() {
    requestAnimFrame(this.initGameLoop.bind(this));
    game_stage.children.forEach(function(child) { child.update(); }); 
    renderer.render(this);
  };

  module.exports = Main;

})();
