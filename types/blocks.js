//NOTE: This is the block representation module for the text renderer
var blocks = {
  0: {
     rep: [
       'x',
       '|'
     ],
     properties: {
       height: 2,
       width: 1,
       gravity: true
     }
  },
  1: {
    rep: ['█'],
    properties: {
      //Might not need this as we already know what it is and can insert it later.
      //type: 1,
      height: 1,
      width: 1,
      gravity: false
    }
  }
};

var BlockLoader = function() {
  var self = this;
  self.blockTypes = {
    PLAYER: 0,
    DIRT: 1,
  };
  self.getBlock = function(blockId) {
    //TODO: Do some type checking here
    var block = blocks[blockId];
    block.properties.type = blockId;
    //Clone the properties
    return JSON.parse(JSON.stringify(block));
  }
}

module.exports = new BlockLoader();
