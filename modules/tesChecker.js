var Blocks = require('../types/blocks.js'),
    blockTypes = Blocks.blockTypes;
var TesChecker = function() {
  var self = this;
  this.check = function(world) {
    if (process.tesworker == undefined) {
      process.tesworker = require('child_process').fork('proc/recTesStructures.js');
    }
    function checkBlocks(tesList) {
      //console.dir(tesList, { depth: 1 });
      process.tesList = tesList;
    }
    var GROUND_LEVEL = 40;
    process.tesworker.send(world.getBlocksInRegion(0, 0, 300, GROUND_LEVEL));
    process.tesworker.removeAllListeners('message');
    process.tesworker.on('message', checkBlocks);
  }
};

module.exports = new TesChecker();
