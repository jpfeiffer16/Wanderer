var Blocks = require('../types/blocks'),
    blockTypes = Blocks.blockTypes,
    io = require('socket.io')(3030),
    logger = require('./logger'),
    PlayerControls = require('./playerControls');

module.exports = function(terrain) {
  var self = this;
  var worldArray = terrain;
  var playerControls = new PlayerControls(worldArray);
  
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
      if (player != null) {
        playerControls.moveRight(player.id);
      }
    });
    socket.on('moveLeft', function(data) {
      var player = worldArray.getPlayer(data.playerId);
      if (player != null) {
        playerControls.moveLeft(player.id);
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
        playerControls.digRight(player.id, topBlock, bottomBlock);
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
        playerControls.digLeft(player.id, topBlock, bottomBlock);
      }
    });
    socket.on('digDown', function(data) {
      var player = worldArray.getPlayer(data.playerId);
      if (player != null) {
        playerControls.digDown(player.id);
      }
    });
    socket.on('placeDown', function(data) {
      var player = worldArray.getPlayer(data.playerId);
      if (player != null) {
        playerControls.placeDown(player.id);
      }
    });
    socket.on('placeUp', function(data) {
      var player = worldArray.getPlayer(data.playerId);
      if (player != null) {
        playerControls.placeUp(player.id);
      }
    });
    socket.on('jump', function(data) {
      var player = worldArray.getPlayer(data.playerId);
      if (player != null) {
        playerControls.jump(player.id);
      }
    });
    socket.on('shootLeft', function(data) {
      var player = worldArray.getPlayer(data.playerId);
      if (player != null) {
          playerControls.shootLeft(player.id);
      }
    });
    socket.on('shootRight', function(data) {
      var player = worldArray.getPlayer(data.playerId);
      if (player != null) {
        playerControls.shootRight(player.id);
      }
    });
    socket.on('dropBomb', function(data) {
      var player = worldArray.getPlayer(data.playerId);
      if (player != null) {
        playerControls.dropBomb(player.id);
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
