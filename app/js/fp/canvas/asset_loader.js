(function() {
  'use strict';

  var PIXI = require('pixi.js');
  module.exports = new PIXI.AssetLoader([ 
    './img/spritesheets/letters_sheet.json',
    './img/spritesheets/numbers_sheet.json',
    './img/spritesheets/planes_sheet.json',
    './img/spritesheets/ui_sheet.json',
    './img/spritesheets/landscape_sheet.json',
    './img/spritesheets/background.png'
  ]);

})();
