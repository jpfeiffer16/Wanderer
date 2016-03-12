var Blocks = require('../types/blocks'),
    blockTypes = Blocks.blockTypes,
    io = require('socket.io')(3030);

module.exports = function(terrain) {
  var self = this;
  var worldArray = terrain
  // var player = worldArray.getPlayer();
  
  //Event listeners:
  io.on('connection', function(socket) {
    console.log('User connected');
    //socket.emit('send world', {});
    socket.on('request world', function(data) {
      var playerId = data.playerId;
      if (data.playerId == undefined) {
        playerId = worldArray.createPlayer(33, 10).id;
      }
      socket.emit('send world', {
        playerId: playerId,
        world: worldArray
      });
    });
  });
  
  
  self.render = function() {
    var blocksToSend = [];
    for (var i = 0; i < worldArray.length; i++) {
      var item = worldArray[i];
      if (item.changed || item.changed == undefined || worldArray.refreshScreen) {
        // renderBlock(item);
        blocksToSend.push(item);
      }
      item._x = item.x;
      item._y = item.y;
    }
    if (blocksToSend.length > 0) {
      io.sockets.emit('blocks changed', blocksToSend);
    }
    if (worldArray.blocksToDelete.length > 0) {
      for (var i = 0; i < worldArray.blocksToDelete.length; i++) {
        var block = worldArray.blocksToDelete[i];
        //Send delete events here
      }
      worldArray.blocksToDelete = [];
    }
    worldArray.refreshScreen = false;
  }

  self.worldArray = worldArray;
  
  self.autoRender = function () {
    setInterval(self.render, 50);
  }
  function renderBlock(block) {
    //Send changed blocks here
    io.sockets.emit('blocks changed', block);
  }
};
