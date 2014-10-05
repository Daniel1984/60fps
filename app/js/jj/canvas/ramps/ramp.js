(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Ramp(texture, xPos, yPos) {
    PIXI.Sprite.call(this, texture); 
    this.position.x = Math.floor(xPos);
    this.position.y = Math.floor(yPos);
    this.half_width = this.width / 2;
    this.half_height = this.height / 2;

    this.getCx = function() {
      return this.position.x + this.half_width;
    };

    this.getCy = function() {
      return this.position.y + this.half_height;
    };

    this.update = function() {

    };
 }

  Ramp.prototype = Object.create(PIXI.Sprite.prototype);
  Ramp.prototype.constructor = Ramp;
  module.exports = Ramp;

})();
