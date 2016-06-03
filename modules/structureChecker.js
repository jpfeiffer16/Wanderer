var Blocks = require('../types/blocks.js'),
    blockTypes = Blocks.blockTypes;
var StructureChecker = function() {
  var self = this;
  this.checkForLooseBlocks = function(world) {
    if (process.worker == undefined) {
      process.worker = require('child_process').fork('proc/backgroundTasks');
    }
    function checkBlocks(looseBlocks) {
      //Add gravity by block id here
      looseBlocks.forEach(function(block) {
        var foundBlock = world.getBlockById(block.id);
        if (foundBlock != null) foundBlock.gravity = true;
      });
    }
    var GROUND_LEVEL = 40;
    process.worker.send(world.getBlocksInRegion(0, 0, 300, GROUND_LEVEL));
    process.worker.removeAllListeners('message');
    process.worker.on('message', checkBlocks);
  }
};

module.exports = new StructureChecker();
