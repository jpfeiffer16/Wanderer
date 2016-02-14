module.exports = function(worldArray) {
  if (worldArray.getPlayer() == null)
    throw 'Error: No player found in specified world';
  var self = this;
  var player = worldArray.getPlayer();
  self.loop = function() {
    for (var i = 0; i < worldArray.length; i ++) {
      var item = worldArray[i];
      //Gravity
      if (item.gravity) {
        if (worldArray.getBlock(item.x, item.y + item.height) == null) {
          item.changed = true;
          item.y++;
        }
      }
    }
  };
  self.playerControls = {
    moveRight: function() {
      var oneBlockEmpty = worldArray.getBlock(player.x + 1, player.y) == null;
      var twoBlocksEmpty = oneBlockEmpty && 
        (worldArray.getBlock(player.x + 1, player.y + 1) == null);
      if (twoBlocksEmpty) {
        player.x++;  
      } else if (oneBlockEmpty) {
        player.x++;
        player.y--;
      }
    },
    moveLeft: function() {
      var oneBlockEmpty = worldArray.getBlock(player.x - 1, player.y) == null;
      var twoBlocksEmpty = oneBlockEmpty && 
        (worldArray.getBlock(player.x - 1, player.y + 1) == null);
      if (twoBlocksEmpty) {
        player.x--;
      } else if (oneBlockEmpty) {
        player.x--;
        player.y--;
      }
    },
    digRight: function() {
      worldArray.deleteBlock(player.x + 1, player.y + 1);
      worldArray.deleteBlock(player.x + 1, player.y);
      worldArray.blocksToDelete.push({
        x: player.x + 1, 
        y: player.y + 1
      });
      worldArray.blocksToDelete.push({
        x: player.x + 1, 
        y: player.y
      });
    },
    digLeft : function() {
      worldArray.deleteBlock(player.x - 1, player.y + 1);
      worldArray.deleteBlock(player.x - 1, player.y);
      worldArray.blocksToDelete.push({
        x: player.x - 1, 
        y: player.y + 1
      });
      worldArray.blocksToDelete.push({
        x: player.x - 1, 
        y: player.y
      });
    }
  };
  
  self.start = function() {
    setInterval(self.loop, 200);
  };
};
