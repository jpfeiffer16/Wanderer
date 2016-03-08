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
  });
  
  io.on('request world', function(socket) {
    socket.emit('send world', worldArray);
  });
  
  self.render = function() {
    for (var i = 0; i < worldArray.length; i++) {
      var item = worldArray[i];
      if (item.changed || item.changed == undefined || worldArray.refreshScreen) {
        renderBlock(item);    
      }
      item._x = item.x;
      item._y = item.y;
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
    io.emit('blocks changed', block);
  }
};
