(function() {
  'use strict';
  
  window.FPW = {};

  var m = require('mithril');

  window.onload = function() {

    if(CocoonJS.App.nativeExtensionObjectAvailable) {
      FPW.url = 'https://min60fps.herokuapp.com/scores';
      //FPW.url = 'http://192.168.0.90:3000/scores';
    } else {
      FPW.url = '/scores';
    }

    m.module(document.body, require('./web/modules/new_leader'));
  };

})();
