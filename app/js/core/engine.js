(function() {
  "use strict";
  
  var PIXI = require('pixi.js');
  var renderer, canvas, game_stage, asset_loader;
  
  function Main(opt) {
    asset_loader = opt.asset_loader;
    PIXI.Stage.call(this, 0x194894, true);
    this.setupCanvas();
    this.loadAssets();
    this.initGameLoop();
  }

  Main.prototype = Object.create(PIXI.Stage.prototype);
  Main.prototype.constructor = Main;

  Main.prototype.setupCanvas = function() {
    if(GO.IS_NATIVE) {
      canvas = document.createElement('screencanvas');
      canvas.style.cssText="idtkscale:ScaleAspectFill;";
      canvas.width = GO.WW;
      canvas.height = GO.WH;
      document.body.appendChild(canvas);
      renderer = new PIXI.CanvasRenderer(GO.WW, GO.WH, canvas);
      game_stage = new PIXI.DisplayObjectContainer();
      ads.init(canvas.getContext("2d"));
    } else {
      renderer = PIXI.autoDetectRenderer(GO.getWidth(), GO.getHeight());
      game_stage = new PIXI.DisplayObjectContainer();
      document.body.appendChild(renderer.view);
    }
    this.addChild(game_stage);
  };

  Main.prototype.loadAssets = function() {
    asset_loader.onComplete = this.onDoneLoadingAssets.bind(this);
    asset_loader.load();
  };

  Main.prototype.addElement = function(child) {
    game_stage.addChild(child);
  };

  Main.prototype.initGameLoop = function() {
    requestAnimationFrame(this.initGameLoop.bind(this));
    for(var i = 0; i < game_stage.children.length; i++) {
      game_stage.children[i].update();
    } 
    renderer.render(this);
  };

  module.exports = Main;

})();
