var Loader = require('./loader'),
    blockTypes = require('../types/blocks').blockTypes;
module.exports = function(worldArray, multiplayer) {
  if (worldArray.getPlayer() == null)
    throw 'Error: No player found in specified world';
  var self = this;
  self.isMultiplayer = multiplayer;
  if (self.isMultiplayer) {
    var socket = require('socket.io-client')('http://localhost:3030');
    socket.on('connect', function() {
      console.log('Connected');
      socket.on('send world', function(data) {
        console.log('World recieved');
        self.playerControls.restoreFromJson(JSON.stringify(data.world));
        player = worldArray.getPlayer(data.playerId);
      });
      socket.on('blocks changed', function(blocks) {
        // console.log('Blocks changed');
        for (var i = 0; i < blocks.length; i++) {
          var thisBlock = blocks[i];
          worldArray.updateBlockById(thisBlock.id, thisBlock);
        }
      });
      socket.emit('request world', {});
    });
  }
  var player = worldArray.getPlayer();
  self.loop = function() {
    //Check the forcast for huge-ass drops of rain.
    //var chanceRain = Math.random() < .1;
    //if (chanceRain) {
    //  worldArray.push({
    //    type: 1,
    //    x: Math.round(Math.random() * 80, 0),
    //    y: 3,
    //    height: 1,
    //    width: 1,
    //    gravity: true
    //  });
    //}
    //var blocksToSend = [];
    for (var i = 0; i < worldArray.length; i ++) {
      var item = worldArray[i];
      if (!self.isMultiplayer) {
        //Gravity
        if (item.gravity) {
          if (worldArray.getBlock(item.x, item.y + item.height) == null) {
            item.changed = true;
            item.y++;
          }
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
        //TODO: Should probably create a method for doing this
        //worldArray.push({
        //  type: 1,
        //  height: 1,
        //  width: 1,
        //  changed: true,
        //  x: player.x,
        //  y: player.y + player.height
        //});
        worldArray.createBlock(blockTypes.DIRT, player.x, player.y + player.height);
      }
    },
    placeUp: function() {
      var topBlockEmpty = worldArray.getBlock(player.x, player.y - 1) == null;
      if (topBlockEmpty) {
        //TODO: Should probably create a method for doing this
        //worldArray.push({
        //  type: 1,
        //  height: 1,
        //  width: 1,
        //  changed: true,
        //  x: player.x,
        //  y: player.y - 1
        //});
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