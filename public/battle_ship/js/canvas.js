(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
	'use strict';

	window.onload = function() {
		window.game = new Phaser.Game(800, 600, Phaser.AUTO);
		game.state.add('Singleplayer', require('./states/single_player.js'));
		game.state.add('Preloader', require('./states/preloader.js'));
		game.state.add('Menu', require('./states/menu.js'));
		game.state.add('Boot', require('./states/boot.js'));
		game.state.start('Boot');
	};

})();

},{"./states/boot.js":2,"./states/menu.js":3,"./states/preloader.js":4,"./states/single_player.js":5}],2:[function(require,module,exports){
module.exports = {

		preload: function() {
			this.load.image('preloader', './img/loader_bar.png');
			this.load.image('loading_splat', './img/loading_splat.jpg');
			this.load.bitmapFont('war_font', './fonts/war.png', './fonts/war.fnt');
		},	

    create: function(){
			console.log('Boot was just loaded', this);
      this.input.maxPointers = 1;
			this.stage.disableVisibilityChange = false;
			this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
			this.scale.maxWidth = 1024;
			this.scale.maxHeight = 768;
      this.scale.alignCanvas();
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
		  this.state.start('Singleplayer');
		},

		onHelpClick: function() {
			console.log('on help click');
		},

    update: function(){
    //Game logic goes here
    },
};

},{}],4:[function(require,module,exports){
module.exports = {
		
		preload: function() {	
			this.loading_bg = this.add.image(this.world.centerX, this.world.centerY, 'loading_splat');
			this.loading_bg.anchor.setTo(0.5, 0.5);

			this.loading_bar = this.add.sprite(0, this.world.height, 'preloader');
			this.loading_bar.anchor.setTo(0, 0.5);
			this.loading_bar.width = this.world.width;

			this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
			this.load.setPreloadSprite(this.loading_bar);

			this.game_name = this.add.bitmapText(this.world.centerX, 100, 'war_font', 'Battle ship', 70);
			this.game_name.x = this.world.centerX - this.game_name.width / 2;
			this.game_name.y = this.game_name.height;
			
			this.load.image('see_tile', './img/sea_tile.jpg');

			this.load.image('land', './img/land.png');
			this.load.image('machinery', './img/machinery.png');
			this.load.image('decor', './img/decor.png');
			this.load.image('buildings', './img/buildings.png');
			this.load.atlasJSONHash('btn_ui', './img/ui.png', './img/ui.json');

			window.fak = this;
		},

		onLoadComplete: function() {
			this.loading_bar.kill();
		  this.state.start('Menu');
		},


    create: function(){
			//this.loading_bar.cropEnabled = false;	
    },

    update: function(){
    //Game logic goes here
    }
};

},{}],5:[function(require,module,exports){
module.exports = {
  create: function(){
    this.addTileBg();
  },

  addTileBg: function() {
    game.add.tileSprite(0, 0, this.world.width, this.world.height, 'see_tile');
  },

  update: function(){
  //Game logic goes here
  }

};

},{}]},{},[1])