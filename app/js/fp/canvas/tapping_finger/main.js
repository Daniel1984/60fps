(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function TappingFinger(options) {
    this.options = options || {};
    var fingerTextures = [
      PIXI.Texture.fromFrame(FP.UI_PATH + 'tap.png'),
      PIXI.Texture.fromFrame(FP.UI_PATH + 'tapTick.png')];
    PIXI.MovieClip.call(this, fingerTextures);
    this.animationSpeed = 0.1;
    this.gotoAndPlay(1);
    this.position.x = Math.ceil(FP.getWidth() / 2 + this.width);
    this.position.y = Math.ceil(this.options.posY || FP.getHeight() / 2 + (this.height - 30));
  }

  TappingFinger.prototype = Object.create(PIXI.MovieClip.prototype);
  TappingFinger.prototype.constructor = TappingFinger;

  module.exports = TappingFinger;

})();
