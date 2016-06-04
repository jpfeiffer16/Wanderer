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
      worldArray.restoreFromJson(JSON.stringify(data.world));
      currentPlayerId = data.playerId;
      player = worldArray.getPlayer(data.playerId);
      logger.log('Got Player: ' + data.playerId);
    });
    socket.on('blocks changed', function(blocks) {
      for (var i = 0; i < blocks.length; i++) {
        var thisBlock = blocks[i];
        worldArray.updateBlockById(thisBlock.id, thisBlock);
      }
      player = worldArray.getPlayer(currentPlayerId);
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
      return {
        x: player == null ? 0 : player.x,
        y: player == null ? 0 : player.y
      }
    },
    getWorld: function() {
      return worldArray;
    }
  }
  
  self.playerControls = {
    moveRight: function() {
      sendEvent('moveRight');
    },
    moveLeft: function() {
      sendEvent('moveLeft');
    },
    digRight: function(topBlock, bottomBlock) {
      sendEvent('digRight', {
        topBlock: topBlock,
        bottomBlock: bottomBlock
      });
    },
    digLeft: function(topBlock, bottomBlock) {
      sendEvent('digLeft', {
        topBlock: topBlock,
        bottomBlock: bottomBlock
      });
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
    shootLeft: function () {
      sendEvent('shootLeft');
    },
    shootRight: function () {
      sendEvent('shootRight');
    },
    dropBomb: function () {
      sendEvent('dropBomb');
    },
    reRender: function() {
      worldArray.refreshScreen = true;
    },
    getWorld: function() {
      sendEvent('request world');
    },
    dropTes: function() {
      sendEvent('dropTes');
    },
    moveTesLeft: function() {
      sendEvent('moveTesLeft');
    },
    moveTesRight: function() {
      sendEvent('moveTesRight');
    }
    // getPlayer: function() {
    //   sendEvent('getPlayer');
    // }
  }
  
  function sendEvent(eventName, extraInfo) {
    var eventData = {};
    eventData.playerId = currentPlayerId;
    if (extraInfo  != undefined) {
      for (var key in extraInfo) {
        eventData[key] = extraInfo[key];
      }
    }
    socket.emit(eventName, eventData);
  }
};
