//DESCRIPTION: This is the module that will take the place of the game engine in multiplayer on client devices.
//It will contain a mock playerControls object that will simply relay the changes to the server via websockets.
var logger = require('./logger');
module.exports = function(worldArray, server) {
  var socket = require('socket.io-client')(server);
  var player = worldArray.getPlayer();
  var currentPlayerId = null;
  var self = this;
  socket.on('connect', function() {
    console.log('Connected');
    socket.on('send world', function(data) {
      // logger.log('Player before: ' + JSON.stringify(player));
      worldArray.restoreFromJson(JSON.stringify(data.world));
      currentPlayerId = data.playerId;
      player = worldArray.getPlayer(data.playerId);
      //self.utilities.worldNeedsUpdate = true;
      logger.log('Player after: ' + JSON.stringify(player));
      logger.log('Got Player: ' + data.playerId);
      // var uuid = require('node-uuid');
      // var fs = require('fs');
      // fs.writeFile('./world' + uuid.v4() + '.json', JSON.stringify(data.world), 'utf8');
    });
    socket.on('blocks changed', function(blocks) {
      logger.log('Blocks changed: ' + blocks.length);
      for (var i = 0; i < blocks.length; i++) {
        var thisBlock = blocks[i];
        worldArray.updateBlockById(thisBlock.id, thisBlock);
        logger.log('currentPlayerId: ' + currentPlayerId + ', player: ' + JSON.stringify(player));
      }
      player = worldArray.getPlayer(currentPlayerId);
      // self.utilities.worldNeedsUpdate = true;
    });
    socket.on('delete blocks', function(blocks) {
      for (var i = 0; i < blocks.length; i++) {
        var thisBlock = blocks[i];
        worldArray.deleteBlock(thisBlock.x, thisBlock.y);
        worldArray.blocksToDelete.push({
          x: thisBlock.x, 
          y: thisBlock.y 
        });
      }
    });
    socket.on('add blocks', function(blocks) {
      for (var i = 0; i < blocks.length; i++) {
        var thisBlock = blocks[i];
        worldArray.addBlock(thisBlock);
      }
    });
    socket.emit('request world', {});
  });
  
  self.utilities = {
    getPlayerCoords: function() {
      // logger.log('Returning player: ' + JSON.stringify(player));
      return {
        x: player == null ? 0 : player.x,
        y: player == null ? 0 : player.y
      }
    },
    getWorld: function() {
      return worldArray;
    },
    worldNeedsUpdate: false
  }
  
  self.playerControls = {
    moveRight: function() {
      sendEvent('moveRight');
    },
    moveLeft: function() {
      sendEvent('moveLeft');
    },
    digRight: function(topBlock, bottomBlock) {
      sendEvent('digRight');
    },
    digLeft: function(topBlock, bottomBlock) {
      sendEvent('digLeft');
    },
    digDown: function() {
      sendEvent('digDown');
    },
    placeDown: function() {
      sendEvent('placeDown');
    },
    placeUp: function() {
      sendEvent('placeUp');
    },
    jump: function() {
      sendEvent('jump');
    },
    reRender: function() {
      worldArray.refreshScreen = true;
    },
    // getPlayer: function() {
    //   sendEvent('getPlayer');
    // }
  }
  
  function sendEvent(eventName) {
    socket.emit(eventName, {
      playerId:currentPlayerId 
    });
  }
};
