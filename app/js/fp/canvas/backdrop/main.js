(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Backdrop(color, alpha) {
    PIXI.Graphics.call(this);
    this.beginFill(color, alpha);
    this.drawRect(0, 0, FP.getWidth(), FP.getHeight());
    this.endFill();
  }

  Backdrop.prototype = Object.create(PIXI.Graphics.prototype);
  Backdrop.prototype.constructor = Backdrop;

  module.exports = Backdrop;

})();
