//DESCRIPTION: This is the module that will take the place of the game engine in multiplayer on client devices.
//It will contain a mock playerControls object that will simply relay the changes to the server via websockets.
module.exports = function(worldArray) {
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
};