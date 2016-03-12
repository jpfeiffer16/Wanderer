//DESCRIPTION: This is the module that will take the place of the game engine in multiplayer on client devices.
//It will contain a mock playerControls object that will simply relay the changes to the server via websockets.
module.exports = function(worldArray) {
	var socket = require('socket.io-client')('http://localhost:3030');
  var player = worldArray.getPlayer();
  var self = this;
  socket.on('connect', function() {
    console.log('Connected');
    socket.on('send world', function(data) {
      // console.log('World recieved');
      worldArray.restoreFromJson(JSON.stringify(data.world));
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
  
  self.utilities = {
    getPlayerCoords: function() {
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
    }
    // reRender: function() {
    //   sendEvent('reRender');
    // },
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