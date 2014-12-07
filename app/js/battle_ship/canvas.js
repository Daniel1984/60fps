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
