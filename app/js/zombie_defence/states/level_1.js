module.exports = {
	
	preload: function() {
		this.load.image('cave_tiles_1', './img/cave_tiles_1.png'); 
		this.load.tilemap('level_1_map', './img/levels_json/level_1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.spritesheet('ikea_man', './img/ikea_man.png', 60, 99);
		require('../utils/preloader')(this.onLoadComplete, this);
	},

	create: function() {
		this.cursors = game.input.keyboard.createCursorKeys();
		this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.physics.arcade.gravity.y = 400;
		this.facing = 'idle';
		this.jumpTimer = 0;
	},
	
	onLoadComplete: function() {
		this.preloader_fill.kill();
		this.preloader_empty.kill();
		this.createWorld();
		this.addPlayer();
	},

	createWorld: function() {
		this.map = game.add.tilemap('level_1_map');
		this.map.addTilesetImage('cave_tiles_1');
		this.layer = this.map.createLayer('level_1_layer');
		this.layer.resizeWorld();
		this.map.setCollision([12, 13, 14, 15, 16, 17, 21, 22, 2, 3, 4, 7, 8, 9]);
	},

	addPlayer: function() {
		this.player = game.add.sprite(0, 0, 'ikea_man');
		this.physics.enable(this.player, Phaser.Physics.ARCADE);	
		this.physics.arcade.enable(this.player);
		this.player.body.bounce.y = 0.2;
    this.player.body.collideWorldBounds = true;
    this.player.body.setSize(50, 75, 5, 5);
		this.player.animations.add('left', [9, 8, 7, 6, 4], 10, true);
    this.player.animations.add('turn', [4], 20, true);
    this.player.animations.add('right', [4, 6, 7, 8, 9], 10, true);

    var jump_anim = this.player.animations.add('jump', [17, 18, 19, 20, 21, 22], 5, true);
		jump_anim.onLoop.add(this.onJumpLoop, this);
		jump_anim.onComplete.add(this.onJumpAnimStopped, this);

    this.camera.follow(this.player);
	},

	onJumpLoop: function(sprite, animation) {
		if(animation.loopCount === 1) animation.loop = false;
	},

	onJumpAnimStopped: function() {
		if(this.facing == 'right') {
    	this.player.animations.play('right');
		} else if(this.facing == 'left') {
    	this.player.animations.play('left');
		}
	},

	update: function() {
		this.physics.arcade.collide(this.player, this.layer);
    this.player.body.velocity.x = 0;
		if(this.cursors.left.isDown) {
    	this.player.body.velocity.x = -150;
      if(this.facing != 'left') {
      	this.player.animations.play('left');
        this.facing = 'left';
      }
    } else if(this.cursors.right.isDown) {
    	this.player.body.velocity.x = 150;
      if(this.facing != 'right') {
      	this.player.animations.play('right');
        this.facing = 'right';
      }
    } else if(this.facing != 'idle') {
    	this.player.animations.stop();
			this.player.frame = 5;
      this.facing = 'idle';
    }
		if(this.jumpButton.isDown && this.player.body.onFloor() && this.time.now > this.jumpTimer) {
    	this.player.body.velocity.y = -350;
      this.jumpTimer = this.time.now + 750;
      this.player.animations.play('jump');
    }
	}
	
};
