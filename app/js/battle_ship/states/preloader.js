module.exports = {
		
		preload: function() {
			this.loading_splat = this.add.image(this.world.centerX, this.world.centerY, 'loading_splat');
			this.loading_splat.anchor.setTo(0.5, 0.5);

			this.loading_bar = this.add.sprite(0, this.world.height, 'preloader');
			this.loading_bar.anchor.setTo(0, 0.5);
			this.loading_bar.width = this.world.width;

			this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
			this.load.setPreloadSprite(this.loading_bar);

			this.game_name = this.add.bitmapText(this.world.centerX, 100, 'war_font', 'Battle ship', 50);
			this.game_name.x = this.world.centerX - this.game_name.width / 2;
			this.game_name.y = this.world.centerY - this.game_name.height / 2;
			
			this.load.image('land', './img/land.png');
			this.load.image('machinery', './img/machinery.png');
			this.load.image('decor', './img/decor.png');
			this.load.image('buildings', './img/buildings.png');
			window.fak = this;
		},

		onLoadComplete: function() {
			this.loading_bar.kill();

			this.help_txt = this.add.bitmapText(0, 0, 'war_font', 'help', 30);
			this.help_txt.x = this.world.centerX - this.help_txt.width / 2;
			this.help_txt.y = this.world.centerY + this.game_name.height * 2;

			this.start_txt = this.add.bitmapText(0, 0, 'war_font', 'start', 30);
			this.start_txt.x = this.world.centerX - this.start_txt.width / 2;
			this.start_txt.y = this.world.centerY + this.game_name.height * 3;
		},

    create: function(){
			this.loading_bar.cropEnabled = false;	
    },

    update: function(){
    //Game logic goes here
    },
};
