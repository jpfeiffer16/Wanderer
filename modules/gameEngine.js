var Loader = require('./loader'),
    blockTypes = require('../types/blocks').blockTypes,
    logger = require('./logger');
module.exports = function(worldArray) {
  // if (worldArray.getPlayer() == null)
  //   throw 'Error: No player found in specified world';
  var self = this;
  var player = worldArray.getPlayer();
  self.loop = function() {
    //Check the forcast for huge-ass drops of rain and other assorted horrible weather.
    if (Math.random() < .1) {
      var rainDropX = Math.round(Math.random() * 100);
      //Use a gravity-enabled block of dirt for now. But need to be changed once we start adding more blocks.
      var rainDrop = worldArray.createBlock(blockTypes.DIRT, rainDropX, 0);
      rainDrop.gravity = true;
    }
    for (var i = 0; i < worldArray.length; i ++) {
      var item = worldArray[i];
      //Gravity
      if (item.gravity) {
        if (worldArray.getBlock(item.x, item.y + item.height) == null) {
          item.changed = true;
          item.y++;
        }
      }
    }
  };
  self.utilities = {
    getPlayerCoords: function() {
      return {
        x: player.x,
        y: player.y
      }
    }
  },
  self.playerControls = {
    moveRight: function() {
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
    },
    moveLeft: function() {
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
    },
    digRight: function(topBlock, bottomBlock) {
      if (bottomBlock) {
        worldArray.deleteBlock(player.x + 1, player.y + 1);
        worldArray.blocksToDelete.push({
          x: player.x + 1, 
          y: player.y + 1
        });
      }
      if (topBlock) {
        worldArray.deleteBlock(player.x + 1, player.y);
        worldArray.blocksToDelete.push({
          x: player.x + 1, 
          y: player.y
        });
      }
    },
    digLeft: function(topBlock, bottomBlock) {
      if (bottomBlock) {
        worldArray.deleteBlock(player.x - 1, player.y + 1);
        worldArray.blocksToDelete.push({
          x: player.x - 1, 
          y: player.y + 1
        });
      }
      if (topBlock) {
        worldArray.deleteBlock(player.x - 1, player.y);
        worldArray.blocksToDelete.push({
          x: player.x - 1, 
          y: player.y
        });
      }
    },
    digDown: function() {
      worldArray.deleteBlock(player.x, player.y + player.height);
      worldArray.blocksToDelete.push({
        x: player.x, 
        y: player.y + player.height 
      });
    },
    placeDown: function() {
      var topBlockEmpty = worldArray.getBlock(player.x, player.y - 1) == null;
      if (topBlockEmpty) {
        player.y--;
        worldArray.createBlock(blockTypes.DIRT, player.x, player.y + player.height);
      }
    },
    placeUp: function() {
      var topBlockEmpty = worldArray.getBlock(player.x, player.y - 1) == null;
      if (topBlockEmpty) {
        worldArray.createBlock(blockTypes.DIRT, player.x, player.y - 1);
      }
    },
    jump: function() {
      var topBlockEmpty = worldArray.getBlock(player.x, player.y - 1) == null;
      if (topBlockEmpty) { 
        player.y--;
      }
    },
    reRender: function() {
      worldArray.refreshScreen = true;
    },
    getPlayer: function() {
      //Re-add our reference to the player
      player = worldArray.getPlayer();  
    }
  };
  
  self.start = function() {
    setInterval(self.loop, 200);
  };
};
