//NOTE: This is the block representation module for the text renderer
var blocks = {
  0: {
     rep: [
       ['x'],
       ['|']
     ],
     properties: {
       height: 2,
       width: 1,
       gravity: true
     }
  },
  1: {
    rep: [['█']],
    properties: {
      //Might not need this as we already know what it is and can insert it later.
      //type: 1,
      height: 1,
      width: 1,
      gravity: false
    }
  }
};

module.exports = (function() {
  var self = this;
  self.blockTypes = {
    PLAYER: 0,
    DIRT: 1,
  };
  self.getBlock = function(blockId) {
    //TODO: Do some type checking here
    return blocks[blockId];
  }
})();
