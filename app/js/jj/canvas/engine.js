(function() {
  "use strict";

  var GameEngine = require('../../core/engine'); 
  var PlayScene = require('./game_play_scene/main');

  function Main() {
    GameEngine.call(this, { asset_loader: require('./asset_loader') });
  }

  Main.prototype = Object.create(GameEngine.prototype);
  Main.prototype.constructor = Main;

  Main.prototype.onDoneLoadingAssets = function() {
    this.addElement(new PlayScene());
  };

  module.exports = Main;

})();
