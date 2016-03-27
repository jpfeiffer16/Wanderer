var World = require('../types/world'),
    Blocks = require('../types/blocks'),
    blockTypes = Blocks.blockTypes;
module.exports = function() {
  var self = this;
  
  var genTerrain = function() {
    var worldArray = new World();
    for (var i = 0; i < 300; i++) {
      var ranNum = Math.round(((Math.random() * 100) / 10), 0);
      for (var j = 0; j < 100; j++) {
        worldArray.createBlock(blockTypes.DIRT, i, j + 40);
      }
    }
    // worldArray.createPlayer(33, 10);
    return worldArray;
  }
  
  return {
    genTerrain: genTerrain
  };
};