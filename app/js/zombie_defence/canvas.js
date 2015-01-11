(function() {
	'use strict';

	window.onload = function() {
		window.game = new Phaser.Game(800, 576, Phaser.AUTO);
		game.state.add('Preloader', require('./states/preloader'));
		game.state.add('Menu', require('./states/menu'));
		game.state.add('Boot', require('./states/boot'));
		game.state.add('Level_1', require('./states/level_1'));
		game.state.start('Boot');
	};

})();
