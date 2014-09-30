(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function MainBg() {
    var texture = PIXI.Texture.fromFrame("Background.png");
    PIXI.TilingSprite.call(this, texture);
    this.width = JJ.getWidth();
    this.height = JJ.getHeight();
  }

  MainBg.prototype = Object.create(PIXI.TilingSprite.prototype);
  MainBg.prototype.constructor = MainBg;

  MainBg.prototype.update = function() {

  };

  module.exports = MainBg;

})();
