module.exports = {

		create: function() { 
      this.addBackground();
      this.addTitle();
			this.addMultiPlayerBtn();
			this.addSinglePlayerBtn();
			this.addHelpBtn();
		},

    addBackground: function() {
			this.loading_bg = this.add.image(this.world.centerX, this.world.centerY, 'loading_splat');
			this.loading_bg.anchor.setTo(0.5, 0.5);
    },

    addTitle: function() {
			this.game_name = this.add.bitmapText(this.world.centerX, 100, 'war_font', 'Battle ship', 70);
			this.game_name.x = this.world.centerX - this.game_name.width / 2;
			this.game_name.y = this.game_name.height;
    },

		addMultiPlayerBtn: function() {
			this.multi_player_btn = this.add.button(
				this.world.centerX, 
				this.world.centerY + 100,
				'btn_ui', 
				this.onMultiPlayerClick,
				this,
				'multi_player_btn_on',
				'multi_player_btn_off',
				'multi_player_btn_on',
				'multi_player_btn_off'
			); 
			this.multi_player_btn.anchor.setTo(0.5, 0.5);
		},

		addSinglePlayerBtn: function() {
			this.single_player_btn = this.add.button(
				this.world.centerX, 
				this.multi_player_btn.y + 50,
				'btn_ui', 
				this.onSinglePlayerClick,
				this,
				'single_player_btn_on',
				'single_player_btn_off',
				'single_player_btn_on',
				'single_player_btn_off'
			); 
			this.single_player_btn.anchor.setTo(0.5, 0.5);
		},

		addHelpBtn: function() {
			this.help_btn = this.add.button(
				this.world.centerX, 
				this.single_player_btn.y + 50,
				'btn_ui', 
				this.onHelpClick,
				this,
				'help_btn_on',
				'help_btn_off',
				'help_btn_on',
				'help_btn_off'
			); 
			this.help_btn.anchor.setTo(0.5, 0.5);
		},

		onMultiPlayerClick: function() {
			console.log('multi player click');
		},

		onSinglePlayerClick: function() {
			console.log('single player clicked');
		},

		onHelpClick: function() {
			console.log('on help click');
		},

    update: function(){
    //Game logic goes here
    },
};
