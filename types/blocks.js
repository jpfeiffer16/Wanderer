//NOTE: This is the block representation module for the text renderer
var blocks = {
  0: {
     rep: [
       'x',
       '|'
     ],
     imageRep: 'player.png',
     properties: {
       height: 2,
       width: 1,
       gravity: true
     }
  },
  1: {
    rep: ['█'],
    properties: {
      height: 1,
      width: 1,
      gravity: false
    }
  },
  3: {
    rep: ['-'],
    imageRep: 'bullet.png',
    properties: {
      height: 1,
      width: 1,
      gravity: false
    }
  },
  4: {
    rep: ['|'],
    properties: {
      height: 1,
      width: 1,
      gravity: true
    }
  },
  5: {
    rep: ['*'],
    properties: {
      height: 1,
      width: 1,
      gravity: true
    }
  }
};

var BlockLoader = function() {
  var self = this;
  self.blockTypes = {
    PLAYER: 0,
    DIRT: 1,
    BULLET: 3,
    BOMB: 4,
    TESSERACT: 5
  };
  self.getBlock = function(blockId) {
    if (typeof(blockId) == 'number') {
      var block = blocks[blockId];
      block.properties.type = blockId;
      //Clone the block
      return JSON.parse(JSON.stringify(block));
    }
  }
}

module.exports = new BlockLoader();
