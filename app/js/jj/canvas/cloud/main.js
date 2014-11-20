(function() {
  'use strict';

	var BaseEnemy = require('../core/base_enemy_mc');
//	var Wind = require('../wind/main');

  function Cloud() {
    BaseEnemy.call(this, ['AngryCloud.png', 'HappyCloud.png']);
		this.width = this.width - 50;
		this.height = this.height - 30;
		this.killed = false;
    this.vx = 0.8;
		this.play();
		this.animationSpeed = 0.01;
		
//		var wind = new Wind();
//		wind.position.x = this.half_width - wind.width / 2 - 10;
//		wind.position.y = this.height - 20;	
//
//		this.update = function() {
//			BaseEnemy.prototype.update.call(this);
//    };

  }

	

  Cloud.prototype = Object.create(BaseEnemy.prototype);
  Cloud.prototype.constructor = Cloud;
  module.exports = Cloud;

})();
