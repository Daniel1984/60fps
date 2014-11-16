(function() {
  'use strict';
  
  window.GO = {};

  var m = require('mithril');

  window.onload = function() {

    if(CocoonJS.App.nativeExtensionObjectAvailable) {
      GO.url = 'https://min60fps.herokuapp.com/fp_scores';
      //GO.url = 'http://192.168.0.90:3000/scores';
    } else {
      GO.url = '/fp_scores';
    }

    m.module(document.body, require('./web/modules/new_leader'));
  };

})();
