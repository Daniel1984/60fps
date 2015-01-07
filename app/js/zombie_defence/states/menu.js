module.exports = {

		create: function() { 
      this.addBackground();
			this.addZombieHand();
      this.addTitle();
      this.addPlayBtn();
		},

    addBackground: function() {
      var loading_bg = this.add.image(this.world.centerX, this.world.centerY, 'landing');
			loading_bg.anchor.setTo(0.5, 0.5);
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
      this.play_btn.setText('');
			this.game_name.setText('');
			var tween = game.add.tween(this.zombie_hand.scale);
      tween.to({ x: 2, y: 2 }, 1000, Phaser.Easing.Exponential.In, true);
			tween.onComplete.addOnce(this.startGame, this);
			tween.start();
    },

		startGame: function() {
			console.log('this.state.start(\'game\')');
		}
};
