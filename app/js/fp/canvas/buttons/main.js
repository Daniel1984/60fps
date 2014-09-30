(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Button(options) { 
    PIXI.DisplayObjectContainer.call(this);
    this.options = options || {};
    this.t_width = this.options.width;
    this.t_height = 35;
    this.renderBtnBackground();
    this.renderLetters();
    this.setupInteractivity();
  }

  Button.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
  Button.prototype.constructor = Button;

  Button.prototype.setupInteractivity = function() {
    this.setInteractive(true);
    this.hitArea = new PIXI.Rectangle(0, 0, this.t_width, this.t_height);
    this.mousedown = this.touchstart = this.options.callback; 
  };

  Button.prototype.renderBtnBackground = function() {
    var texture = PIXI.Texture.fromFrame(FP.UI_PATH + 'buttonLarge.png');
    var background = new PIXI.Sprite(texture);
    background.width = this.t_width;
    background.height = this.t_height;
    this.addChild(background);
  };

  Button.prototype.renderLetters = function() {
    var posX = this.options.lettersXoffset;
    for(var i = 0, len = this.options.letters.length; i < len; i += 1) {
      if(this.options.letters[i] === '') {
        posX += this.options.letterW;
      } else {
        var texture = PIXI.Texture.fromFrame(FP.LETTERS_PATH + 'letter' + this.options.letters[i] + '.png');
        var letter = new PIXI.Sprite(texture);
        letter.width = this.options.letterW;
        letter.height = this.options.letterH;
        letter.position.x = posX; 
        letter.position.y = 6;
        this.addChild(letter);
        posX += letter.width;
      }
    }
  };

  module.exports = Button;

})();
