(function() {
  'use strict';

  module.exports = function(src) {

    this.audio= new Audio();
    this.audio.src = (typeof this.audio.canPlayType === 'function' && this.audio.canPlayType("audio/mpeg") !== "") ? ('sound/' + src + '.mp3') : ('sound/' + src + '.ogg');
    this.audio.load();

    this.play = function() {
			if(!GO.IS_NATIVE && GO.isMobile()) return;
      this.audio.currentTime = 0;
      this.audio.volume = 0.5;
      this.audio.play();
      return this;
    };

  };

})();
