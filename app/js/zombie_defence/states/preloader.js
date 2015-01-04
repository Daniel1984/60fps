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
			this.load.image('grass_tiles', './img/grass_tiles.png');
			this.load.bitmapFont('blod_font', './fonts/blood_font.png', './fonts/blood_font.fnt');

      this.addBackground();
      this.addPreloader();
		},

    addBackground: function() {
      var loading_bg = this.add.image(this.world.centerX, this.world.centerY, 'landing');
			loading_bg.anchor.setTo(0.5, 0.5);
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
      this.addTitle();
      this.addPlayBtn();
      this.addZombies();
		},

    addTitle: function() {
			this.game_name = this.add.bitmapText(0, 0, 'blod_font', 'zombie defence', game.device.desktop ? 100 : 60);
			this.game_name.x = this.world.centerX - this.game_name.width / 2;
			this.game_name.y = this.game_name.height;
      game.add.tween(this.game_name).from( { y: -200 }, 1000, Phaser.Easing.Bounce.Out, true);
    },

    addPlayBtn: function() {
			this.play_btn = this.add.bitmapText(0, 0, 'blod_font', 'play', game.device.desktop ? 120 : 70);
			this.play_btn.x = this.world.centerX - this.play_btn.width / 2;
			this.play_btn.y = this.world.height - this.play_btn.height * 2;
      game.add.tween(this.play_btn).from( { y: this.world.height + 200 }, 1000, Phaser.Easing.Bounce.Out, true);
      this.play_btn.inputEnabled = true;
      this.play_btn.events.onInputDown.add(this.onPlayBtnClick, this);
    },

    onPlayBtnClick: function() {
      this.zombie_1.kill();
      this.play_btn.setText('');
      game.add.tween(this.zombie_2.scale).to({ x: 100, y: 100 }, 2000, Phaser.Easing.Linear.None, true);
      game.add.tween(this.zombie_2).to({ alpha: 0 }, 4000, Phaser.Easing.Linear.None, true);
    },

    addZombies: function() {
      this.zombie_1 = this.add.sprite(this.world.centerX, this.world.centerY, 'single_zombie_1');
      this.zombie_1.x -= this.zombie_1.width;
      this.zombie_1.scale.x = this.zombie_1.scale.y = 2;
      this.zombie_1.anchor.setTo(0.5, 0.5);
      window.fall = this.zombie_1;
      this.zombie_2 = this.add.sprite(this.world.centerX, this.world.centerY, 'single_zombie_2');
      this.zombie_2.x += this.zombie_2.width;
      this.zombie_2.scale.x = this.zombie_2.scale.y = 2;
      this.zombie_2.anchor.setTo(0.5, 0.5);

      game.add.tween(this.zombie_1).from({ x: -this.zombie_1.width }, 1000, Phaser.Easing.Bounce.Out, true);
      game.add.tween(this.zombie_2).from({ x: this.world.width + this.zombie_1.width }, 1000, Phaser.Easing.Bounce.Out, true);
    },

};
