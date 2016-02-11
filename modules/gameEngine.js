module.exports = function(worldArray) {
//  console.log(worldArray.toString());
//  if (worldArray.toString() != '[object Array]') throw 'Error: no worldArray passed to gameEngine';
  var self = this;
  self.loop = function() {
    for (var i = 0; i < worldArray.length; i ++) {
      var item = worldArray[i];
      //Gravity
      if (item.gravity) {
        if (worldArray.getBlock(item.x, item.y + 1) == null && item.y < 40) {
          item.changed = true;
          item.y++;
        }
      }
    }
  };
  
  // self.renderer = new (require('./renderer'));
  // self.world = 
  
  self.start = function() {
    setInterval(self.loop, 200);
  };
};