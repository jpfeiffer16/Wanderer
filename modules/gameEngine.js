module.exports = function(worldArray) {
//  console.log(worldArray.toString());
//  if (worldArray.toString() != '[object Array]') throw 'Error: no worldArray passed to gameEngine';
  if (worldArray.getPlayer() == null)
    throw 'Error: No player found in specified world';
  var self = this;
  self.player = worldArray.getPlayer();
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
      var oneBlockEmpty = worldArray.getBlock(self.player.x + 1, self.player.y) == null;
      var twoBlocksEmpty = oneBlockEmpty && 
        (worldArray.getBlock(self.player.x + 1, self.player.y + 1) == null);
      if (twoBlocksEmpty) {
        self.player.x++;  
      } else if (oneBlockEmpty) {
        self.player.x++;
        self.player.y--;
      }
    },
    moveLeft: function() {
      var oneBlockEmpty = worldArray.getBlock(self.player.x - 1, self.player.y) == null;
      var twoBlocksEmpty = oneBlockEmpty && 
        (worldArray.getBlock(self.player.x - 1, self.player.y + 1) == null);
      if (twoBlocksEmpty) {
        self.player.x--;  
      } else if (oneBlockEmpty) {
        self.player.x--;
        self.player.y--;
      }
    }
  };
  
  self.start = function() {
    setInterval(self.loop, 200);
  };
};
