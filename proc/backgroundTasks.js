var Blocks = require('../types/blocks'),
    blockTypes = Blocks.blockTypes;
var World = require('../types/world');
function isGroundedBlock(world, x, y) {
  var block = world.getBlock(x, y);
  if (block == null) return false;
  return block.isGrounded == undefined ?
    false : block.isGrounded;
}
function checkForLooseBlocks(worldArray) {
  var world = new World();
  worldArray.forEach(function (block) {
    world.push(block); 
  });
  var blocks = world; 
  if (blocks.length > 0) {
    //Clear isGrounded values here so we can reason about what has changed
    blocks.forEach(function (block) {
      block.isGrounded = false;
    });

    var blocksChanged = loop();
    while (blocksChanged) {
      blocksChanged = loop();
    }

    //Return blocks that are not grounded
    var looseBlocks = [];
    blocks.forEach(function (block) {
      if (!block.isGrounded &&
          block.type != blockTypes.PLAYER &&
          block.type != blockTypes.BULLET) {
        looseBlocks.push(block);
      }
    });
    process.send(looseBlocks);
  }

  function loop() {
    var changed = 0;
    blocks.forEach(function(block) {
      if (!block.isGrounded &&
          block.type != blockTypes.PLAYER &&
          block.type != blockTypes.BULLET
          ) {
        //Do groundig checks and increment the changed number if it is grounded
        if (
          (block.y == 39) ||
            (
              (isGroundedBlock(world, block.x - 1, block.y)) ||    
              (isGroundedBlock(world, block.x, block.y - 1)) ||    
              (isGroundedBlock(world, block.x + 1, block.y)) ||    
              (isGroundedBlock(world, block.x, block.y + 1))    
            )
           ) {
          block.isGrounded = true;
          changed++;
        }
      }
    });
    return changed > 0;
  }
}

process.on('message', checkForLooseBlocks);
