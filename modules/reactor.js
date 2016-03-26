//DESCRIPTION: This is the module that will take the place of the game engine in multiplayer on client devices.
//It will contain a mock playerControls object that will simply relay the changes to the server via websockets.
var logger = require('./logger');
module.exports = function(worldArray) {
	var socket = require('socket.io-client')('http://localhost:3030');
  var player = worldArray.getPlayer();
  var self = this;
  socket.on('connect', function() {
    console.log('Connected');
    socket.on('send world', function(data) {
      logger.log('Player before: ' + JSON.stringify(player));
      worldArray.restoreFromJson(JSON.stringify(data.world));
      player = worldArray.getPlayer(data.playerId);
      logger.log('Player after: ' + JSON.stringify(player));
    });
    socket.on('blocks changed', function(blocks) {
      logger.log('Blocks changed: ' + blocks.length);
      for (var i = 0; i < blocks.length; i++) {
        var thisBlock = blocks[i];
        worldArray.updateBlockById(thisBlock.id, thisBlock);
      }
    });
    socket.emit('request world', {});
  });
  
  self.utilities = {
    getPlayerCoords: function() {
      // logger.log('Returning player: ' + JSON.stringify(player));
      return {
        x: player.x,
        y: player.y
      }
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
      playerId: player.id
    });
  }
};