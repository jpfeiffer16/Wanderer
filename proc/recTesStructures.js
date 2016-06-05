var Blocks = require('../types/blocks'),
    blockTypes = Blocks.blockTypes,
    World = require('../types/world');

function getTesStructures(worldArray) {
  //Create a world object that we can work with
  var world = new World();
  worldArray.forEach(function(block) {
    world.push(block);
  });

  var blocks = world.getBlocksInRegion(0, 0, 300, 40);
  var tesBlocks = blocks.filter(function(block) {
    return block.type == blockTypes.TESSERACT;
  });
  var tesseractList = {};
  tesBlocks.forEach(function(block) {
    var touchingBlocks = getBlocksTouchingTes(block);
    tesseractList[block.playerId] = touchingBlocks;
  });
  process.send(tesseractList);
  function getBlocksTouchingTes(tesBlock) {
    //Clear isTouchingTes props on all blocks
    blocks.forEach(function(block) {
      block.isTouchingTes = false;  
    });
    //Now run the loop until we find all blocks touching the specified tes
    var newBlocks = false;
    do {
      newBlocks = loop();
    } while (newBlocks);

    var touchingBlocks = [];
    blocks.forEach(function (block) {
      if (block.isTouchingTes) { 
        touchingBlocks.push(block);
      }
    });
    return touchingBlocks;

    function loop() {
      var changed = 0;
      blocks.forEach(function(block) {
        if (!block.isTouchingTes) {
          if (isTouching(block.x, block.y, tesBlock.playerId)) {
            block.isTouchingTes = true;
            changed++;
          }
        }
      });
      return changed > 0;
    }
    function isTouching(x, y, playerId) {
      var posList = [
        {x: x , y: y - 1},
        {x: x + 1 , y: y},
        {x: x, y: y + 1},
        {x: x - 1 , y: y}
      ];
      for (var i = 0; i < posList.length; i++) {
        var pos = posList[i];
        var worldBlock = world.getBlock(pos.x, pos.y);
        if (worldBlock == null) continue;
        if (
            (
             worldBlock.type == blockTypes.TESSERACT
             &&
             worldBlock.playerId == playerId
            ) ||
              worldBlock.isTouchingTes
            ) {
          return true;
        }
      }
      return false;
    }
  }
}

process.on('message', getTesStructures);
