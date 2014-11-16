(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Wind() {
		var texture = PIXI.Texture.fromFrame('CloudWind.png');
    PIXI.Sprite.call(this, texture); 

    this.update = function() {

    };
 }

  Wind.prototype = Object.create(PIXI.Sprite.prototype);
  Wind.prototype.constructor = Wind;
  module.exports = Wind;

})();
