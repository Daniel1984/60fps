module.exports = {

		preload: function() {
			this.load.image('progress_empty', './img/progress_empty.png');
			this.load.image('progress_fill', './img/progress_fill.png');
			this.load.image('landing', './img/landing.jpg');
		},	

    create: function(){
      this.input.maxPointers = 1;
			this.stage.disableVisibilityChange = false;
			this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
			this.scale.maxWidth = 1024;
			this.scale.maxHeight = 768;
      this.scale.alignCanvas();
			this.scale.setScreenSize(true);
			this.input.addPointer();
			this.stage.backgroundColor = '#000000';
			this.scale.refresh();

			this.state.start('Preloader');
    },

};
