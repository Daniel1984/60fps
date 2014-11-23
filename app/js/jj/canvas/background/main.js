(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function CloudsBackground() {
    var texture = PIXI.Texture.fromFrame("Background_Clouds.png");
    PIXI.TilingSprite.call(this, texture);
    this.width = GO.getWidth();
    this.height = GO.getHeight();
  }

  CloudsBackground.prototype = Object.create(PIXI.TilingSprite.prototype);
  CloudsBackground.prototype.constructor = CloudsBackground;

  CloudsBackground.prototype.update = function() {

  };

  module.exports = CloudsBackground;

})();
