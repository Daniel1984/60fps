module.exports = {

		create: function() { 
      this.addBackground();
			this.addZombieHand();
      this.addTitle();
      this.addPlayBtn();
		},

    addBackground: function() {
      this.bg = this.add.image(this.world.centerX, this.world.centerY, 'landing');
			this.bg.anchor.setTo(0.5, 0.5);
    },

    addZombieHand: function() {
			this.zombie_hand = this.add.sprite(this.world.centerX, this.world.height, 'zombie_hand');
			this.zombie_hand.anchor.setTo(0.5, 0.5);
			this.zombie_hand.y -= this.zombie_hand.height / 2;	
      this.add.tween(this.zombie_hand).from({ y: this.world.height + this.zombie_hand.height }, 1000, Phaser.Easing.Bounce.Out, true);
    },

    addTitle: function() {
			this.game_name = this.add.bitmapText(0, 0, 'blod_font', 'zombie defence', game.device.desktop ? 100 : 70);
			this.game_name.x = this.world.centerX - this.game_name.width / 2;
			this.game_name.y = this.game_name.height;
    },

    addPlayBtn: function() {
			this.play_btn = this.add.button(
				this.world.centerX, 
				this.world.height - 20,
				'ui', 
				this.onPlayBtnClick,
				this,
				'btn_play_hover',
				'btn_play_still',
				'btn_play_hover',
				'btn_play_still'
			); 
			this.play_btn.anchor.setTo(0.5, 1);
    },

    onPlayBtnClick: function() {
      this.play_btn.kill();
			this.game_name.setText('');
			var tween = this.add.tween(this.zombie_hand.scale);
      tween.to({ x: 2, y: 2 }, 1000, Phaser.Easing.Exponential.In, true);
			tween.onComplete.addOnce(this.darkenStage, this);
			tween.start();
    },

		darkenStage: function() {
			game.add.tween(this.zombie_hand).to({ alpha: 0 }, 1000, "Linear", true);	
			game.add.tween(this.bg).to({ alpha: 0 }, 1000, "Linear", true).onComplete.addOnce(this.startGame, this);
		},

		startGame: function() {
			this.state.start('Level_1');
		}

};
