(function() {
  'use strict';

	var BaseEnemy = require('../core/base_enemy_mc');

  function Hearth() {
    BaseEnemy.call(this, ['HearthEnemy1.png', 'HearthEnemy2.png']);
		this.scale.x = 0.9;
		this.scale.y = 0.9;
		this.killed = false;
    this.vx = 1;
		this.play();
		this.animationSpeed = 0.05;
  }


  Hearth.prototype = Object.create(BaseEnemy.prototype);
  Hearth.prototype.constructor = Hearth;
  module.exports = Hearth;

})();
