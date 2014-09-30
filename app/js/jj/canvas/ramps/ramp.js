(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Ramp(texture, xPos, yPos) {
    PIXI.Sprite.call(this, texture); 
    this.position.x = Math.floor(xPos);
    this.position.y = Math.floor(yPos);

    this.update = function() {

    };
 }

  Ramp.prototype = Object.create(PIXI.Sprite.prototype);
  Ramp.prototype.constructor = Ramp;
  module.exports = Ramp;

})();
