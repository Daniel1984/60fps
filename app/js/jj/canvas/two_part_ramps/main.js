(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function TwoPartRamp(frame) {
    PIXI.DisplayObjectContainer.call(this);
    var _this = this;
    this.vy = 5;
    this.frames = [
      ['HalfLandPiece_Left_Blue.png', 'HalfLandPiece_Right_Blue.png'],
      ['HalfLandPiece_Left_Gray.png', 'HalfLandPiece_Right_Gray.png'],
      ['HalfLandPiece_Left_Green.png', 'HalfLandPiece_Right_Green.png'],
      ['HalfLandPiece_Left_Pink.png', 'HalfLandPiece_Right_Pink.png'],
      ['HalfLandPiece_Left_Multicolored.png', 'HalfLandPiece_Right_Multicolored.png']
    ];

    for(var i = 0; i < 2; i++) {
      var texture = PIXI.Texture.fromFrame(this.frames[frame][i]);
      var sprite = new PIXI.Sprite(texture);
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      if(i === 0) {
        sprite.position.x = 0; 
      } else {
        // -13 is to match exact size of cracked ramp;
        sprite.position.x = sprite.width - 13;
      }
      this.addChild(sprite);
    }

    var left_part = this.children[0];
    var right_part = this.children[1];

    this.update = function() {
      this.moveDown();
      this.rotateObjects();
      this.detectIfOffscreen();
    };

    this.moveDown = function() {
      this.position.y += this.vy;
    };

    this.rotateObjects = function() {
      left_part.rotation += 0.1;
      right_part.rotation -= 0.1;
    };

    this.detectIfOffscreen = function() {
      if(this.position.y > GO.getHeight() + this.width) this.parent.removeChild(this);
    };

  }

  TwoPartRamp.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
  TwoPartRamp.prototype.constructor = TwoPartRamp; 
  module.exports = TwoPartRamp;

})();
