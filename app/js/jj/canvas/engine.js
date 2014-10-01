(function() {
  "use strict";

  var GameEngine = require('../../core/engine'); 
  var StartScene = require('./game_start_scene/main');
  var PlayScene = require('./game_play_scene/main');

  function Main() {
    GameEngine.call(this, { asset_loader: require('./asset_loader') });
    var _this = this;

    this.startGameScene = function() {
      _this.addElement(new PlayScene());  
    };
  }

  Main.prototype = Object.create(GameEngine.prototype);
  Main.prototype.constructor = Main;

  Main.prototype.onDoneLoadingAssets = function() {
    this.addElement(new StartScene());
  };

  module.exports = Main;

})();
