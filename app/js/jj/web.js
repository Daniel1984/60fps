(function() {
  'use strict';
  
  window.GO = {};

  var m = require('mithril');

  window.onload = function() {

    if(CocoonJS.App.nativeExtensionObjectAvailable) {
      GO.url = 'https://min60fps.herokuapp.com/jj_scores';
    } else {
      GO.url = '/jj_scores';
    }

    m.module(document.body, require('./web/modules/new_leader'));
  };

})();
