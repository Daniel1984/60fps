(function() {
  'use strict';

  var PIXI = require('pixi.js'),
      Button = require('../buttons/main');

  function ResetGameControls() {
    PIXI.DisplayObjectContainer.call(this);
    this.position.y = FP.getHeight() - 190 / 2;
    this.position.x = FP.getWidth() / 2 - 300 / 2;
//    this.addShareBtn();
    this.addRestartBtn();
    this.addLeaderBoardBtn();
  }

  ResetGameControls.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
  ResetGameControls.prototype.constructor = ResetGameControls;

//  ResetGameControls.prototype.addShareBtn = function() {
//    var options = {
//      width: 140,
//      letters: ['S', 'H', 'A', 'R', 'E'],
//      letterH: 20,
//      letterW: 15,
//      lettersXoffset: 30,
//      callback: function() {
//        alert('not implemented yet');
//      }
//    };
//    var button = new Button(options);
//    button.y = 50;
//    this.addChild(button);    
//  };

  ResetGameControls.prototype.addRestartBtn = function() {
    var _this = this;
    var options = {
      width: 300, 
      letters: ['R', 'E', 'S', 'T', 'A', 'R', 'T'],
      letterH: 20,
      letterW: 15,
      lettersXoffset: 100,
      callback: function() {
        _this.parent.parent.parent.restartGame();
      }
    };
    var button = new Button(options);
    button.y = 50;
    this.addChild(button);
  };

  ResetGameControls.prototype.addLeaderBoardBtn = function() {
    var options = {
      width: 300,
      letters: ['A','D','D','','T','O','','L','E','A','D','E','R','B','O','A','R','D'],
      letterH: 20,
      letterW: 15,
      lettersXoffset: 15,
      callback: function() {
        CocoonJS.App.disableTouchInCocoonJS();
        CocoonJS.App.onLoadInTheWebViewSucceed.addEventListener(function(pageURL) {  
          CocoonJS.App.forward("score =" + FP.GAME_SCORE + "; m.redraw();");
          CocoonJS.App.showTheWebView();
        });
        CocoonJS.App.loadInTheWebView('./web_views/index.html');
      }
    };
    var button = new Button(options);
    this.addChild(button);
  };

  module.exports = ResetGameControls;

})();
