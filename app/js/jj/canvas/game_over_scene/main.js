(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function GameOverScene() {
    PIXI.DisplayObjectContainer.call(this);
    var _this = this;
    var score;

    this.addGameOverTxt = function() {
      var text = new PIXI.BitmapText("GAME OVER", { font: "30px font", align: "center" });
      text.position.x = GO.getWidth() / 2 - text.width / 2;
      text.position.y = GO.getHeight() / 4 - text.height / 2;
      this.addChild(text);
    };

    this.addScore = function() {
      if(score) this.removeChild(score);
      score = new PIXI.BitmapText("SCORE: " + GO.SCORE + "\nTOP SCORE: " + GO.TOP_SCORE, 
        { font: "20px font", align: "center" }
      );
      score.position.x = GO.getWidth() / 2 - score.width/ 2;
      score.position.y = GO.getHeight() / 2 - score.height / 2;
      this.addChild(score);
    };
    
    this.addRestartTxt = function() {
      var text = new PIXI.BitmapText("RESTART", { font: "26px font" });
      text.x = GO.getWidth() / 2 - text.width / 2;
      text.y = GO.getHeight() - text.height * 6;
      text.interactive = true;
      text.buttonMode = true;
      text.mousedown = text.tap = function() { 
        _this.parent.restartGame();
      };
      this.addChild(text);
    };

		this.addLeaderBoardBtn = function() {
      var text = new PIXI.BitmapText("ADD SCORE", { font: "26px font", align: 'center' });
      text.x = GO.getWidth() / 2 - text.width / 2;
      text.y = GO.getHeight() - text.height * 2;
      text.interactive = true;
      text.buttonMode = true;
      text.mousedown = text.tap = this.onAddToLeaderboardClick;
			this.addChild(text);
		};

		this.onAddToLeaderboardClick = function() {
			_this.parent.addLoadingScreen();
      CocoonJS.App.disableTouchInCocoonJS();
      CocoonJS.App.onLoadInTheWebViewSucceed.addEventListener(_this.onWebViewLoaded);
      CocoonJS.App.loadInTheWebView('./web_views/index.html');
		};

		this.onWebViewLoaded = function(pageURL) {  
			_this.parent.removeLoadingScreen();
      CocoonJS.App.forward("score =" + GO.SCORE + "; m.redraw();");
      CocoonJS.App.showTheWebView();
			_this.removeCocoonListener();
    };

		this.removeCocoonListener = function() {
			CocoonJS.App.onLoadInTheWebViewSucceed.removeEventListener(_this.onWebViewLoaded);
		};

    this.update = function() {
      this.addScore();
    };

    this.addGameOverTxt();
    this.addRestartTxt();
		this.addLeaderBoardBtn();
    
  }

  GameOverScene.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
  GameOverScene.prototype.constructor = GameOverScene; 
  module.exports = GameOverScene;

})();
