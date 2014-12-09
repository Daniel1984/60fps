module.exports = {
		
		preload: function() {	
			this.loading_bg = this.add.image(this.world.centerX, this.world.centerY, 'loading_splat');
			this.loading_bg.anchor.setTo(0.5, 0.5);

			this.loading_bar = this.add.sprite(0, this.world.height, 'preloader');
			this.loading_bar.anchor.setTo(0, 0.5);
			this.loading_bar.width = this.world.width;

			this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
			this.load.setPreloadSprite(this.loading_bar);

			this.game_name = this.add.bitmapText(this.world.centerX, 100, 'war_font', 'Battle ship', 70);
			this.game_name.x = this.world.centerX - this.game_name.width / 2;
			this.game_name.y = this.game_name.height;
			
      // two images below to replace leter with spritesheet
			this.load.image('see_tile_2', './img/see_tile_2.png');
			this.load.image('see_tile', './img/sea_tile.jpg');

			this.load.image('land', './img/land.png');
			this.load.image('machinery', './img/machinery.png');
			this.load.image('decor', './img/decor.png');
			this.load.image('buildings', './img/buildings.png');
			this.load.atlasJSONHash('btn_ui', './img/ui.png', './img/ui.json');

			window.fak = this;
		},

		onLoadComplete: function() {
			this.loading_bar.kill();
		  this.state.start('Menu');
		},


    create: function(){
			//this.loading_bar.cropEnabled = false;	
    },

    update: function(){
    //Game logic goes here
    }
};
