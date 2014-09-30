(function() {
  'use strict';

  var PIXI = require('pixi.js');
  var Jimmy = require('../jimmy/main');
  var ramps_manager = require('../ramps/manager');
  var jimmy;

  function PlayScene() {
    PIXI.DisplayObjectContainer.call(this);
    
    this.addJimmy = function() {
      jimmy = new Jimmy();
      jimmy.position.x = GO.getWidth() / 2 - jimmy.width / 2;
      jimmy.position.y = GO.getHeight() / 2 - jimmy.height;
      this.addChild(jimmy);
    };
    
    this.addRamps = function() {
      var ramps = ramps_manager.getRamps({texture: 'LandPiece_DarkGreen.png', count: 20});
      for(var i = 0; i < ramps.length; i++) {
        this.addChild(ramps[i]);
      }
    };
      
    this.setupInteraction = function() {
      document.addEventListener('keydown', jimmy.handleKeyDown);
      document.addEventListener('keyup', jimmy.handleKeyUp);
    };
    
    this.update = function() {
      for(var i = 0; i < this.children.length; i++) {
        this.children[i].update();
      } 
    };

    this.addRamps();
    this.addJimmy();
    this.setupInteraction();
  }

  PlayScene.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
  PlayScene.prototype.constructor = PlayScene; 
  module.exports = PlayScene; 

})();
