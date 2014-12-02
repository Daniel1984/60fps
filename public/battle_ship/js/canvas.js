(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
	'use strict';

	window.onload = function() {
		window.game = new Phaser.Game(800, 600, Phaser.AUTO);
		game.state.add('Play', require('./states/play.js'));
		game.state.add('Preloader', require('./states/preloader.js'));
		game.state.add('Menu', require('./states/menu.js'));
		game.state.add('Boot', require('./states/boot.js'));
		game.state.start('Boot');
	};

})();

},{"./states/boot.js":2,"./states/menu.js":3,"./states/play.js":4,"./states/preloader.js":5}],2:[function(require,module,exports){
module.exports = {

		preload: function() {
			this.load.image('preloader', './img/loader_bar.png');
			this.load.image('loading_splat', './img/loading_splat.jpg');
			this.load.bitmapFont('war_font', './fonts/war.png', './fonts/war.fnt');
		},	

    create: function(){
    	//This is just like any other Phaser create function
			console.log('Boot was just loaded', this);
      this.input.maxPointers = 1;
			this.stage.disableVisibilityChange = false;
			this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
			this.scale.maxWidth = 1024;
			this.scale.maxHeight = 768;
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
			this.stage.forceLandscape = true;
			this.scale.setScreenSize(true);
			this.input.addPointer();
			this.stage.backgroundColor = '#171642';
			this.scale.refresh();

			this.state.start('Preloader');
    },

    update: function(){
    	//Game logic goes here
    }
};

},{}],3:[function(require,module,exports){
module.exports = {
    create: function(){
    //This is just like any other Phaser create function
    },
    update: function(){
    //Game logic goes here
    },
};

},{}],4:[function(require,module,exports){
module.exports=require(3)
},{}],5:[function(require,module,exports){
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

},{}]},{},[1])