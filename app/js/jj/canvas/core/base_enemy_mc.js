(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Main(frames) {
    var textures = [];
    for(var i = 0; i < frames.length; i++) {
      textures.push(PIXI.Texture.fromFrame(frames[i]));
    }
    PIXI.MovieClip.call(this, textures);

    this.position.x = Math.random() * (GO.getWidth() - this.width);
		this.position.y = -this.height;
    this.half_width = this.width / 2;
    this.half_height = this.height / 2;
  }
  Main.prototype = Object.create(PIXI.MovieClip.prototype);
  Main.prototype.constructor = Main;
  module.exports = Main;

  Main.prototype.getCx = function() {
    return this.position.x + this.half_width;
  };

  Main.prototype.getCy = function() {
    return this.position.y + this.half_height;
  };

  //het full y pos including height
  Main.prototype.getFy = function() {
    return this.position.y + this.height;
  };

  Main.prototype.update = function() {
    this.horizontalMove();
    this.verticalMove();
  };

  Main.prototype.horizontalMove = function() {
    if(this.position.x <= 0 || this.position.x >= GO.getWidth() - this.width) this.vx *= -1;
    this.position.x += this.vx;
  };

  Main.prototype.verticalMove = function() {
		if(this.killed) this.position.y += 5;
		if(this.position.y > GO.getHeight()) this.parent.removeChild(this);
  };

	Main.prototype.kill = function() {
		this.killed = true;
	};

})();
