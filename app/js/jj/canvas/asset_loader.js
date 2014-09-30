(function() {
  'use strict';

  var PIXI = require('pixi.js');

  module.exports = new PIXI.AssetLoader([ 
    './img/jj.json',
    './css/font.fnt'
  ]);

})();
