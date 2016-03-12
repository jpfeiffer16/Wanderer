var World = require('../types/world'),
    Blocks = require('../types/blocks'),
    blockTypes = Blocks.blockTypes;
module.exports = function() {
  var self = this;
  
  var genTerrain = function() {
    var worldArray = new World();
    //for (var i = 0; i < columns; i++) {
    for (var i = 0; i < 300; i++) {
      var ranNum = Math.round(((Math.random() * 100) / 10), 0);
      // worldArray.push({
      //  type: 1,
      //  x: i,
      //  y: 5,
      //  height: 1,
      //  width: 1
      // });
      // var rainDrop = worldArray.createBlock(blockTypes.DIRT, i, 5);
      // rainDrop.gravity = true;
      for (var j = 0; j < 100; j++) {
        //var item = {
        //  // gravity: true,
        //  type: 1,
        //  x: i,
        //  y: j + 40,
        //  height: 1,
        //  width: 1
        //};
        // var item = Blocks.getBlock(blockTypes.DIRT).properties;
        // item.x = i;
        // item.y = j + 40;
        // worldArray.push(item);
        worldArray.createBlock(blockTypes.DIRT, i, j + 40);
      }
      //console.log(worldArray);
    }

    //for (var i = 2; i < 30; i = i + 1) {
    //  for (var j = 2; j < 30; j = j + 1) {
    //    worldArray.push({
    //      type: 1,
    //      x: j,
    //      y: i,
    //      height: 1,
    //      width: 1,
    //      gravity: true
    //    });
    //  }
    //}

    // worldArray.push({
    //   type: 0,
    //   x: 33,
    //   y: 10,
    //   height: 2,
    //   width: 1,
    //   gravity: true
    // });
    
    // var player = Blocks.getBlock(blockTypes.PLAYER).properties;
    // player.x = 33;
    // player.y = 10;
    // 
    // 
    // worldArray.push(player);
    worldArray.createPlayer(33, 10);

    return worldArray;
  }
  
  return {
    genTerrain: genTerrain
  };
};
