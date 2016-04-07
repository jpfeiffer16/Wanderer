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
      // worldArray.blocksToDelete.push({
      //   x: player.x + 1, 
      //   y: player.y + 1
      // });
    }
    if (topBlock) {
      worldArray.deleteBlock(player.x + 1, player.y);
      // worldArray.blocksToDelete.push({
      //   x: player.x + 1, 
      //   y: player.y
      // });
    }
  };
  this.digLeft = function(playerId, topBlock, bottomBlock) {
    var player = worldArray.getPlayer(playerId);
    if (bottomBlock) {
      worldArray.deleteBlock(player.x - 1, player.y + 1);
      // worldArray.blocksToDelete.push({
      //   x: player.x - 1, 
      //   y: player.y + 1
      // });
    }
    if (topBlock) {
      worldArray.deleteBlock(player.x - 1, player.y);
      // worldArray.blocksToDelete.push({
      //   x: player.x - 1, 
      //   y: player.y
      // });
    }
  },
  this.digDown = function(playerId) {
    var player = worldArray.getPlayer(playerId);
    worldArray.deleteBlock(player.x, player.y + player.height);
    //TODO: this needs to be moved in the World type.
    // worldArray.blocksToDelete.push({
    //   x: player.x, 
    //   y: player.y + player.height 
    // });
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
  this.reRender = function(playerId) {
    worldArray.refreshScreen = true;
  };
  // this.getPlayer = function() {
  //   //Re-add our reference to the player
  //   player = worldArray.getPlayer();  
  // }
}
