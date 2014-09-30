(function() {
  "use strict";

  var GameEngine = require('../../core/engine'); 
  var StartScene = require('./game_start_scene/main');

  function Main() {
    GameEngine.call(this, { asset_loader: require('./asset_loader') });
  }

  Main.prototype = Object.create(GameEngine.prototype);
  Main.prototype.constructor = Main;

  Main.prototype.onDoneLoadingAssets = function() {
    this.addElement(new StartScene());
  };

  module.exports = Main;

})();
