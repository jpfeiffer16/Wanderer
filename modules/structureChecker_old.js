var Blocks = require('../types/blocks.js'),
    blockTypes = Blocks.blockTypes;
function isGroundedBlock(world, x, y) {
  var block = world.getBlock(x, y);
  if (block == null) return false;
  return block.isGrounded == undefined ?
    false : block.isGrounded;
}
var StructureChecker = function() {
  var self = this;
  var GROUND_LEVEL = 40;
  this.checkForLooseBlocks = function(world) {
    var blocks = world.getBlocksInRegion(0, 0, 100, GROUND_LEVEL); 
    //console.log(blocks.length);
    if (blocks.length > 0) {
      //Clear isGrounded values here so we can reason about what has changed
      blocks.forEach(function (block) {
        block.isGrounded = false;
      });

      var blocksChanged = loop();
      while (blocksChanged) {
        blocksChanged = loop();
      }

      //Add gravity to blocks that are not grounded
      blocks.forEach(function (block) {
        if (!block.isGrounded &&
            block.type != blockTypes.PLAYER &&
            block.type != blockTypes.BULLET) {
          block.gravity = true;
        }
      });


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
  };
};

module.exports = new StructureChecker();
