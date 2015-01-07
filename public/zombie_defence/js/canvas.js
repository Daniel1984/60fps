(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
	'use strict';

	window.onload = function() {
		window.game = new Phaser.Game(800, 600, Phaser.AUTO);
//	game.state.add('Singleplayer', require('./states/single_player.js'));
		game.state.add('Preloader', require('./states/preloader.js'));
		game.state.add('Menu', require('./states/menu.js'));
		game.state.add('Boot', require('./states/boot.js'));
		game.state.start('Boot');
	};

})();

},{"./states/boot.js":2,"./states/menu.js":3,"./states/preloader.js":4}],2:[function(require,module,exports){
module.exports = {

		preload: function() {
			this.load.image('progress_empty', './img/progress_empty.png');
			this.load.image('progress_fill', './img/progress_fill.png');
			this.load.image('landing', './img/graveyard_bg_2.jpg');
      this.load.bitmapFont('blod_font', './fonts/blood_font.png', './fonts/blood_font.fnt');
		},	

    create: function(){
      this.input.maxPointers = 1;
			this.stage.disableVisibilityChange = false;
			this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
			this.scale.maxWidth = 1024;
			this.scale.maxHeight = 768;
      this.scale.alignCanvas();
			this.scale.setScreenSize(true);
			this.input.addPointer();
			this.stage.backgroundColor = '#000000';
			this.scale.refresh();

			this.state.start('Preloader');
    },

};

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}]},{},[1])