module.exports = {
		
		preload: function() {
			this.load.image('slime', './img/slime.png');
			this.load.image('zombie_1', './img/zombie_1.png');
			this.load.image('zombie_2', './img/zombie_2.png');
			this.load.image('zombie_3', './img/zombie_3.png');
			this.load.image('zombie_4', './img/zombie_4.png');
			this.load.image('zombie_5', './img/zombie_5.png');
			this.load.image('zombie_6', './img/zombie_6.png');
			this.load.image('single_zombie_1', './img/single_zombie_1.png');
			this.load.image('single_zombie_2', './img/single_zombie_2.png');
			this.load.image('zombie_hand', './img/hand.png');
			this.load.image('grass_tiles', './img/grass_tiles.png');	

      this.addBackground();
      this.addTitle();
      this.addPreloader();
		},

    addBackground: function() {
      var loading_bg = this.add.image(this.world.centerX, this.world.centerY, 'landing');
			loading_bg.anchor.setTo(0.5, 0.5);
    },

    addTitle: function() {
			this.game_name = this.add.bitmapText(0, 0, 'blod_font', 'zombie defence', game.device.desktop ? 100 : 60);
			this.game_name.x = this.world.centerX - this.game_name.width / 2;
			this.game_name.y = this.game_name.height;
    },

    addPreloader: function() {
      this.preloader_fill = this.add.sprite(this.world.centerX, this.world.centerY, 'progress_fill');
      this.preloader_fill.anchor.setTo(0, 0.5);
      this.preloader_fill.x -= this.preloader_fill.width / 2;

      this.preloader_empty = this.add.sprite(this.world.centerX, this.world.centerY, 'progress_empty');
      this.preloader_empty.anchor.setTo(0.5, 0.5);
			this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
			this.load.setPreloadSprite(this.preloader_fill);
    },

		onLoadComplete: function() {
			this.preloader_fill.kill();
			this.preloader_empty.kill();
			this.state.start('Menu');
		}

};
