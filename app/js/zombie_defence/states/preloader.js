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
			this.addZombieHand();
      this.addTitle();
      this.addPlayBtn();
		},

    addZombieHand: function() {
			this.zombie_hand = this.add.sprite(this.world.centerX, this.world.height, 'zombie_hand');
			this.zombie_hand.anchor.setTo(0.5, 0.5);
			this.zombie_hand.y -= this.zombie_hand.height / 2;	
      game.add.tween(this.zombie_hand).from({ y: this.world.height + this.zombie_hand.height }, 1000, Phaser.Easing.Bounce.Out, true);
    },

    addTitle: function() {
			this.game_name = this.add.bitmapText(0, 0, 'blod_font', 'zombie defence', game.device.desktop ? 100 : 60);
			this.game_name.x = this.world.centerX - this.game_name.width / 2;
			this.game_name.y = this.game_name.height;
      game.add.tween(this.game_name).from( { y: -200 }, 1000, Phaser.Easing.Bounce.Out, true);
    },

    addPlayBtn: function() {
			this.play_btn = this.add.bitmapText(0, 0, 'blod_font', 'play', game.device.desktop ? 120 : 70);
			window.fak = this.play_btn;
			this.play_btn.x = this.world.centerX - this.play_btn.width / 2;
			this.play_btn.y = this.world.height - this.play_btn.height * 2;
      game.add.tween(this.play_btn).from( { y: this.world.height + 200 }, 1000, Phaser.Easing.Bounce.Out, true);
      this.play_btn.inputEnabled = true;
      this.play_btn.events.onInputDown.add(this.onPlayBtnClick, this);
    },

    onPlayBtnClick: function() {
      this.play_btn.setText('');
			this.game_name.setText('');
			var tween = game.add.tween(this.zombie_hand.scale);
      tween.to({ x: 2, y: 2 }, 1000, Phaser.Easing.Exponential.In, true);
			tween.onComplete.addOnce(this.startGame, this);
			tween.start();
    },

		startGame: function() {
			console.log('starting game');
		}

};
