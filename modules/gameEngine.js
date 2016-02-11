module.exports = function(worldArray) {
//  console.log(worldArray.toString());
//  if (worldArray.toString() != '[object Array]') throw 'Error: no worldArray passed to gameEngine';
  var self = this;

  self.loop = function() {
    for (var i = 0; i < worldArray.length; i ++) {
      var item = worldArray[i];
      //TODO: do proccessing here;
      if (item.gravity) {
        item.changed = true;
        item.y++;
      }
    }
  };

  setInterval(self.loop, 200);
};
