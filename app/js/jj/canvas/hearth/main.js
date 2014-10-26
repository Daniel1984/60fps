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

    this.vx = 1;
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
      this.horizontalMove();
      this.verticalMove();
    };

    this.horizontalMove = function() {
      if(this.position.x <= 0 || this.position.x >= GO.getWidth() - this.width) this.vx *= -1;
      this.position.x += this.vx;
    };

    this.verticalMove = function() {

    };

  }


  Hearth.prototype = Object.create(PIXI.MovieClip.prototype);
  Hearth.prototype.constructor = Hearth;
  module.exports = Hearth;

})();
