var blockTypes = require('../types/blocks').blockTypes;
module.exports = function PlayerControls(worldArray) {
  var self = this;
  this.moveRight = function(playerId) {
    var player = worldArray.getPlayer(playerId);
    var oneBlockEmpty = worldArray.getBlock(player.x + 1, player.y) == null;
    var stepEmpty = oneBlockEmpty && 
      (worldArray.getBlock(player.x + 1, player.y - 1) == null);
    var twoBlocksEmpty = oneBlockEmpty && 
      (worldArray.getBlock(player.x + 1, player.y + 1) == null);
    if (twoBlocksEmpty) {
      player.x++;  
    } else if (stepEmpty) {
      player.x++;
      player.y--;
    }
  };
  this.moveLeft = function(playerId) {
    var player = worldArray.getPlayer(playerId);
    var oneBlockEmpty = worldArray.getBlock(player.x - 1, player.y) == null;
    var stepEmpty = oneBlockEmpty &&
      (worldArray.getBlock(player.x - 1, player.y - 1) == null);
    var twoBlocksEmpty = oneBlockEmpty && 
      (worldArray.getBlock(player.x - 1, player.y + 1) == null);
    if (twoBlocksEmpty) {
      player.x--;
    } else if (stepEmpty) {
      player.x--;
      player.y--;
    }
  };
  this.digRight = function(playerId, topBlock, bottomBlock) {
    var player = worldArray.getPlayer(playerId);
    if (bottomBlock) {
      worldArray.deleteBlock(player.x + 1, player.y + 1);
    }
    if (topBlock) {
      worldArray.deleteBlock(player.x + 1, player.y);
    }
  };
  this.digLeft = function(playerId, topBlock, bottomBlock) {
    var player = worldArray.getPlayer(playerId);
    if (bottomBlock) {
      worldArray.deleteBlock(player.x - 1, player.y + 1);
    }
    if (topBlock) {
      worldArray.deleteBlock(player.x - 1, player.y);
    }
  },
  this.digDown = function(playerId) {
    var player = worldArray.getPlayer(playerId);
    worldArray.deleteBlock(player.x, player.y + player.height);
  };
  this.placeDown = function(playerId) {
    var player = worldArray.getPlayer(playerId);
    var topBlockEmpty = worldArray.getBlock(player.x, player.y - 1) == null;
    if (topBlockEmpty) {
      player.y--;
      worldArray.createBlock(blockTypes.DIRT, player.x, player.y + player.height);
    }
  };
  this.placeUp = function(playerId) {
    var player = worldArray.getPlayer(playerId);
    var topBlockEmpty = worldArray.getBlock(player.x, player.y - 1) == null;
    if (topBlockEmpty) {
      worldArray.createBlock(blockTypes.DIRT, player.x, player.y - 1);
    }
  };
  this.jump = function(playerId) {
    var player = worldArray.getPlayer(playerId);
    var topBlockEmpty = worldArray.getBlock(player.x, player.y - 1) == null;
    if (topBlockEmpty) { 
      player.y--;
    }
  };
  this.shootLeft = function (playerId) {
    var player = worldArray.getPlayer(playerId);
    var bullet = worldArray.createBlock(blockTypes.BULLET, player.x - 1, player.y);
    bullet.vx = -1;
    bullet.vy = 0;
  };
  this.shootRight = function (playerId) {
    var player = worldArray.getPlayer(playerId);
    var bullet = worldArray.createBlock(blockTypes.BULLET, player.x + 1, player.y);
    bullet.vx = 1;
    bullet.vy = 0;
  }
  this.dropBomb = function (playerId) {
    var player = worldArray.getPlayer(playerId);
    var bomb = worldArray.createBlock(blockTypes.BOMB, player.x, player.y + 1); 
  };
  this.dropTnt = function (playerId) {
    var player = worldArray.getPlayer(playerId);
    var tnt = worldArray.createBlock(blockTypes.TNT, player.x, player.y + 1);
    tnt.playerId = playerId;
  };
  this.detTnt = function(playerId) {
    worldArray.filter(function(block) {
      return (block.type == blockTypes.TNT) &&
            (block.playerId == playerId);
    }).forEach(function(block) {
      var deletedBlock = worldArray.deleteBlockById(block.id);
      worldArray.createBlock(blockTypes.BOMB, deletedBlock.x, deletedBlock.y);
    });
  };
  this.reRender = function(playerId) {
    worldArray.refreshScreen = true;
  };
  this.dropTes = function(playerId) {
    var player = worldArray.getPlayer(playerId);
    var tesseract = worldArray.createBlock(blockTypes.TESSERACT, player.x, player.y + player.height - 1);
    tesseract.playerId = playerId;
  };
  this.moveTesLeft = function(playerId) {
    var player = worldArray.getPlayer(playerId);
    if (process.tesList == undefined) return;
    var tesList = process.tesList[playerId];
    if (tesList == undefined) return;
    tesList.forEach(function(block) {
      var refBlock = worldArray.getBlockById(block.id);
      if (refBlock != null) refBlock.x--;
      if (block.type == blockTypes.PLAYER && block.id == player.id)
        player.x--;
    }); 
  };
  this.moveTesRight = function(playerId) {
    var player = worldArray.getPlayer(playerId);
    if (process.tesList == undefined) return;
    var tesList = process.tesList[playerId];
    if (tesList == undefined) return;
    tesList.forEach(function(block) {
      var refBlock = worldArray.getBlockById(block.id);
      if (refBlock != null) refBlock.x++;
      if (block.type == blockTypes.PLAYER && block.id == player.id)
        player.x++;
    }); 
  };
  this.rotateTes = function(playerId) {
    var player = worldArray.getPlayer(playerId);
    if (process.tesList == undefined) return;
    var tesList = process.tesList[playerId];
    if (tesList == undefined) return;
    var refBlocks = tesList.map(b => worldArray.getBlockById(b.id)).filter(b => b);
    // var maxX = Math.max.apply(null, tesList.map(t => t.x));
    // var minX = Math.min.apply(null, tesList.map(t => t.y));
    var maxX = Math.max.apply(null, refBlocks.map(t => t.x));
    var minX = Math.min.apply(null, refBlocks.map(t => t.x));
    tesList.forEach(function(block) {
      var refBlock = worldArray.getBlockById(block.id);
      if (refBlock != null) refBlock.x = minX + (maxX - refBlock.x);
      if (block.type == blockTypes.PLAYER && block.id == player.id)
        player.x = minX + (maxX - player.x);
    }); 
  }
  this.zoomToGround = function(playerId) {
    var player = worldArray.getPlayer(playerId);
    for (var i = player.height; i <= 100; i++) {
      if (worldArray.getBlock(player.x, player.y + i) != null) {
        player.y = player.y + (i - player.height);
        return;
      }
    }
  };
  // this.getPlayer = function() {
  //   //Re-add our reference to the player
  //   player = worldArray.getPlayer();  
  // }
}
