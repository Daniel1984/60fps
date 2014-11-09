(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Hearth() {
    var textures = [];
    var frames = ['HearthEnemy1.png', 'HearthEnemy2.png'];
    for(var i = 0; i < frames.length; i++) {
      textures.push(PIXI.Texture.fromFrame(frames[i]));
    }
    PIXI.MovieClip.call(this, textures);

		this.killed = false;
    this.vx = 1;
    this.position.x = Math.random() * (GO.getWidth() - this.width);
		this.position.y = -this.height;
    this.half_width = this.width / 2;
    this.half_height = this.height / 2;
		this.play();
		this.animationSpeed = 0.05;

    this.getCx = function() {
      return this.position.x + this.half_width;
    };

    this.getCy = function() {
      return this.position.y + this.half_height;
    };

    //het full y pos including height
    this.getFy = function() {
      return this.position.y + this.height;
    };

    this.update = function() {
      this.horizontalMove();
      this.verticalMove();
    };

    this.horizontalMove = function() {
      if(this.position.x <= 0 || this.position.x >= GO.getWidth() - this.width) this.vx *= -1;
      this.position.x += this.vx;
    };

    this.verticalMove = function() {
			if(this.killed) this.position.y += 5;
			if(this.position.y > GO.getHeight()) this.parent.removeChild(this);
    };

		this.kill = function() {
			this.killed = true;
		};

  }


  Hearth.prototype = Object.create(PIXI.MovieClip.prototype);
  Hearth.prototype.constructor = Hearth;
  module.exports = Hearth;

})();
