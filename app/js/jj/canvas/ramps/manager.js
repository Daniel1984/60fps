(function() {
  'use strict';

  var PIXI = require('pixi.js');
  var Ramp = require('./ramp');

  module.exports = {
    
    getRamps: function(opts) {
      var res = [];
      var texture = PIXI.Texture.fromFrame(opts.texture);
      //var texture_broken = PIXI.Texture.fromFrame(opts.texture_broken);
      var posX, posY;
      for(var i = 0; i < opts.count; i++) {
        if(i === 0) {
          posX = GO.getWidth() / 2 - texture.width / 2;
          posY = GO.getHeight() - 10;
        } else {
          //posX = Math.floor(Math.random() * GO.getWidth());
          //posY = Math.floor(Math.random() * GO.getHeight());
        }
        res.push(new Ramp(texture, posX, posY));
      }
      return res;
    }

  };

})();
