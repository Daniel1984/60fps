module.exports = {

		preload: function() {
			this.load.image('progress_empty', './img/progress_empty.png');
			this.load.image('progress_fill', './img/progress_fill.png');
			this.load.image('landing', './img/graveyard_bg_2.jpg');
      this.load.bitmapFont('blod_font', './fonts/blood_font.png', './fonts/blood_font.fnt');
		},	

    create: function(){
      this.input.maxPointers = 1;
			this.stage.disableVisibilityChange = false;
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			//this.scale.maxWidth = 1024;
			//this.scale.maxHeight = 768;
      this.scale.alignCanvas();
	//		this.scale.pageAlignVertically = true;
	//		this.scale.pageAlignHorizontally = true;
			this.scale.setScreenSize();
			this.input.addPointer();
			this.stage.backgroundColor = '#000000';
			this.scale.refresh();

			this.state.start('Preloader');
    },

};
