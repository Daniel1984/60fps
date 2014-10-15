(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Ramp(opt) {
    var types = [
      [],
      [],
      [],
      []
    ];

    var texture = PIXI.Texture.fromFrame('LandPiece_DarkGreen.png');
    PIXI.Sprite.call(this, texture); 
    this.position.x = Math.random() * (GO.getWidth() - this.width);
    this.half_width = this.width / 2;
    this.half_height = this.height / 2;

    this.getCx = function() {
      return this.position.x + this.half_width;
    };

    this.getCy = function() {
      return this.position.y + this.half_height;
    };

    this.update = function() {
      // repositioning ramps when below bottom of screen
	    if(this.position.y > GO.getHeight()) {
	      this.position.y = this.position.y - (GO.getHeight() + (Math.random() + 100 - 20) + 20);
        this.position.x = Math.random() * (GO.getWidth() - this.width);
	    }
    };
 }

  Ramp.prototype = Object.create(PIXI.Sprite.prototype);
  Ramp.prototype.constructor = Ramp;
  module.exports = Ramp;

})();
