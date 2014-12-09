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
