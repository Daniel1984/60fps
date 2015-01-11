module.exports = {
		
		preload: function() {
			this.load.image('zombie_hand', './img/hand.png');
			this.load.atlasJSONHash('ui', './img/ui.png', './img/ui.json');

      this.addBackground();
      this.addTitle();
			require('../utils/preloader')(this.onLoadComplete, this);
		},

    addBackground: function() {
      var loading_bg = this.add.image(this.world.centerX, this.world.centerY, 'landing');
			loading_bg.anchor.setTo(0.5, 0.5);
    },

    addTitle: function() {
			this.game_name = this.add.bitmapText(0, 0, 'blod_font', 'zombie defence', game.device.desktop ? 100 : 70);
			this.game_name.x = this.world.centerX - this.game_name.width / 2;
			this.game_name.y = this.game_name.height;
    },

		onLoadComplete: function() {
			this.preloader_fill.kill();
			this.preloader_empty.kill();
			this.state.start('Menu');
		}

};
