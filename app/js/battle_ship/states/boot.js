module.exports = {

		preload: function() {
			this.load.image('preloader', './img/loader_bar.png');
			this.load.image('loading_splat', './img/loading_splat.jpg');
			this.load.bitmapFont('war_font', './fonts/war.png', './fonts/war.fnt');
		},	

    create: function(){
    	//This is just like any other Phaser create function
			console.log('Boot was just loaded', this);
      this.input.maxPointers = 1;
			this.stage.disableVisibilityChange = false;
			this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
			this.scale.maxWidth = 1024;
			this.scale.maxHeight = 768;
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
			this.stage.forceLandscape = true;
			this.scale.setScreenSize(true);
			this.input.addPointer();
			this.stage.backgroundColor = '#171642';
			this.scale.refresh();

			this.state.start('Preloader');
    },

    update: function(){
    	//Game logic goes here
    }
};
