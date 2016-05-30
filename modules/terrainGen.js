var World = require('../types/world'),
    Blocks = require('../types/blocks'),
    blockTypes = Blocks.blockTypes;
module.exports = function() {
  var height = 100;
  var width = 300;
  var genTerrain = function(addPlayer) {
    var worldArray = new World();
    for (var i = 0; i < width; i++) {
      //var ranNum = Math.round(((Math.random() * 100) / 10), 0);
      for (var j = 0; j < height; j++) {
        worldArray.createBlock(blockTypes.DIRT, i, j + 40);
      }
    }
    if (addPlayer) {
      worldArray.createPlayer(33, 10);
    }
    worldArray.width = width;
    worldArray.height = height;
    return worldArray;
  }
  
  return {
    genTerrain: genTerrain
  };
};
