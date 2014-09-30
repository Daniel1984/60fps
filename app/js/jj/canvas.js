(function() {
  'use strict';

  var parser = require('user-agent-parser');
  var Engine = require('./canvas/engine');

  window.GO = {
    GAME_OVER: false,
    DEVICE: parser(navigator.userAgent).device.type, 
    IS_NATIVE: CocoonJS.App.nativeExtensionObjectAvailable,
    WW: window.innerWidth,
    WH: window.innerHeight,
    isMobile: function() {
      if(this.DEVICE && this.DEVICE === 'mobile') return true;
      return false;
    },
  
    getWidth: function() {
      if(this.isMobile() || this.IS_NATIVE || window.innerWidth < 480) return window.innerWidth;
      return 480;
    },
  
    getHeight: function() {
      if(this.isMobile() || this.IS_NATIVE || window.innerHeight < 640) return window.innerHeight;
      return 640;
    }
  };

  window.onload = function() {
    new Engine();
  };

})();
