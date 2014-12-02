module.exports = {
		
		preload: function() {	
			this.loading_splat = this.add.image(this.world.centerX, this.world.centerY, 'loading_splat');
			this.loading_splat.anchor.setTo(0.5, 0.5);

			this.loading_bar = this.add.sprite(0, this.world.height, 'preloader');
			this.loading_bar.anchor.setTo(0, 0.5);
			this.loading_bar.width = this.world.width;

			this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
			this.load.setPreloadSprite(this.loading_bar);

			this.game_name = this.add.bitmapText(this.world.centerX, 100, 'war_font', 'Battle ship', 70);
			this.game_name.x = this.world.centerX - this.game_name.width / 2;
			this.game_name.y = this.game_name.height;
			
			this.load.image('land', './img/land.png');
			this.load.image('machinery', './img/machinery.png');
			this.load.image('decor', './img/decor.png');
			this.load.image('buildings', './img/buildings.png');
		//	this.load.image('multi_player_off', './img/multi_player_off.png');
		//	this.load.image('multi_player_on', './img/multi_player_on.png');
		//	this.load.image('single_player_off', './img/single_player_off.png');
		//	this.load.image('single_player_on', './img/single_player_on.png');
		//	this.load.image('help_off', './img/help_off.png');
		//	this.load.image('help_on', './img/help_on.png');
			this.load.atlasJSONHash('btn_ui', './img/ui.png', './img/ui.json');

			window.fak = this;
		},

		onLoadComplete: function() {
			this.loading_bar.kill();
			this.addMultiPlayerBtn();
			this.addSinglePlayerBtn();
			this.addHelpBtn();
//			this.add.buton(
//				_this.game,
//				_this.world.centerX, 
//				_this.world.centerY + 100,
//				'multi_player_on',
//				function() {
//					console.log('hahahah');
//				},
//				_this,
//				_this.cache.getImage('multi_player_on'),
//				_this.cache.getImage('multi_player_off'),
//				_this.cache.getImage('multi_player_on'),
//				_this.cache.getImage('multi_player_off')
//			);
			//this.single_player_btn = this.add.image(this.world.centerX, this.world.centerY + 100, 'single_player_off');
			//this.single_player_btn.anchor.setTo(0.5, 0.5);

			//this.multi_player_btn = this.add.image(this.world.centerX, this.single_player_btn.y + 50, 'multi_player_off');
			//this.multi_player_btn.anchor.setTo(0.5, 0.5);

			//this.single_player_btn = this.add.image(this.world.centerX, this.multi_player_btn.y + 50, 'help_off');
			//this.single_player_btn.anchor.setTo(0.5, 0.5);
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

    create: function(){
			this.loading_bar.cropEnabled = false;	
    },

    update: function(){
    //Game logic goes here
    },
};
