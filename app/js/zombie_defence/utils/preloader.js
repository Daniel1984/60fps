module.exports = function(cb, context) {
	context.preloader_fill = context.add.sprite(context.world.centerX, context.world.centerY, 'progress_fill');
	context.preloader_fill.anchor.setTo(0, 0.5);
	context.preloader_fill.x -= context.preloader_fill.width / 2;
	
	context.preloader_empty = context.add.sprite(context.world.centerX, context.world.centerY, 'progress_empty');
	context.preloader_empty.anchor.setTo(0.5, 0.5);
	context.load.onLoadComplete.addOnce(cb, context);
	context.load.setPreloadSprite(context.preloader_fill);
};
