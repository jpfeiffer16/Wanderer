var Blocks = require('../types/blocks'),
    blockTypes = Blocks.blockTypes,
    io = require('socket.io')(3030),
    logger = require('./logger');

module.exports = function(terrain) {
  var self = this;
  var worldArray = terrain;
  
  //Event listeners:
  io.on('connection', function(socket) {
    console.log('User connected');
    socket.on('request world', function(data) {
      var playerId = data.playerId;
      if (data.playerId == undefined) {
        playerId = worldArray.createPlayer(33, 10).id;
      }
      console.log('begin sending world');
      console.log('World Size: ' + worldArray.length);
      console.log(playerId);
      socket.emit('send world', {
        playerId: playerId,
        world: worldArray
      });
      console.log('after sending world');
    });
    //Client Events
    socket.on('moveRight', function(data) {
      var player = worldArray.getPlayer(data.playerId);
      debugger;
      if (player != null) {
        var oneBlockEmpty = worldArray.getBlock(player.x + 1, player.y) == null;
        var stepEmpty = oneBlockEmpty && 
          (worldArray.getBlock(player.x + 1, player.y - 1) == null);
        var twoBlocksEmpty = oneBlockEmpty && 
          (worldArray.getBlock(player.x + 1, player.y + 1) == null);
        if (twoBlocksEmpty) {
          player.x++;
          player.changed = true;
        } else if (stepEmpty) {
          player.x++;
          player.y--;
          player.changed = true;
        }
      }
    });
    socket.on('moveLeft', function(data) {
      var player = worldArray.getPlayer(data.playerId);
      if (player != null) {
        var oneBlockEmpty = worldArray.getBlock(player.x - 1, player.y) == null;
        var stepEmpty = oneBlockEmpty &&
          (worldArray.getBlock(player.x - 1, player.y - 1) == null);
        var twoBlocksEmpty = oneBlockEmpty && 
          (worldArray.getBlock(player.x - 1, player.y + 1) == null);
        if (twoBlocksEmpty) {
          player.x--;
          player.changed = true;
        } else if (stepEmpty) {
          player.x--;
          player.y--;
          player.changed = true;
        }
      }
    });
    socket.on('digRight', function(data) {
      var player = worldArray.getPlayer(data.playerId),
          bottomBlock = true, topBlock = true;
      if (data.topBlock != undefined) {
        topBlock = data.topBlock;
      }
      if (data.bottomBlock != undefined) {
        bottomBlock = data.bottomBlock;
      }
      if (player != null) {
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
      }
    });
    socket.on('digLeft', function(data) {
      var player = worldArray.getPlayer(data.playerId),
          bottomBlock = true, topBlock = true;
      if (data.topBlock != undefined) {
        topBlock = data.topBlock;
      }
      if (data.bottomBlock != undefined) {
        bottomBlock = data.bottomBlock;
      }
      if (player != null) {
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
      }
    });
    socket.on('digDown', function(data) {
      var player = worldArray.getPlayer(data.playerId);
      if (player != null) {
        worldArray.deleteBlock(player.x, player.y + player.height);
        worldArray.blocksToDelete.push({
          x: player.x, 
          y: player.y + player.height 
        });
      }
    });
    socket.on('placeDown', function(data) {
      var player = worldArray.getPlayer(data.playerId);
      if (player != null) {
        var topBlockEmpty = worldArray.getBlock(player.x, player.y - 1) == null;
        if (topBlockEmpty) {
          player.y--;
          worldArray.createBlock(blockTypes.DIRT, player.x, player.y + player.height);
        }
      }
    });
    socket.on('placeUp', function(data) {
      var player = worldArray.getPlayer(data.playerId);
      if (player != null) {
        var topBlockEmpty = worldArray.getBlock(player.x, player.y - 1) == null;
        if (topBlockEmpty) {
          worldArray.createBlock(blockTypes.DIRT, player.x, player.y - 1);
        }
      }
    });
    socket.on('jump', function(data) {
      var player = worldArray.getPlayer(data.playerId);
      if (player != null) {
        var topBlockEmpty = worldArray.getBlock(player.x, player.y - 1) == null;
        if (topBlockEmpty) { 
          player.y--;
        }
      }
    });
  });
  
  self.render = function() {
    var blocksToSend = [];
    for (var i = 0; i < worldArray.length; i++) {
      var item = worldArray[i];
      if (item.changed || item.changed == undefined ||
        item.x != item._x || item.y != item._y) {
        item.changed = true;
        blocksToSend.push(item);
      }
      item._x = item.x;
      item._y = item.y;
      item.changed = false;
    }
    if (blocksToSend.length > 0) {
      io.sockets.emit('blocks changed', blocksToSend);
    }
    if (worldArray.blocksToDelete.length > 0) {
      io.sockets.emit('delete blocks', worldArray.blocksToDelete);
      worldArray.blocksToDelete.length = 0;
    }
    if (worldArray.blocksToAdd.length > 0) {
      io.sockets.emit('add blocks', worldArray.blocksToAdd);
      worldArray.blocksToAdd.length = 0;
    }
    worldArray.refreshScreen = false;
  }

  self.worldArray = worldArray;
  
  self.autoRender = function () {
    setInterval(self.render, 50);
  }
};
