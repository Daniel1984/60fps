(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Spring() {
		var texture = PIXI.Texture.fromFrame('Spring.png');
    PIXI.Sprite.call(this, texture); 

    this.update = function() {

    };
 }

  Spring.prototype = Object.create(PIXI.Sprite.prototype);
  Spring.prototype.constructor = Spring;
  module.exports = Spring;

})();
