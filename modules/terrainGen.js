var World = require('../types/world');
module.exports = function() {
  var self = this;
  
  var genTerrain = function(rows, columns) {
    var worldArray = new World();
    for (var i = 0; i < columns; i++) {
      var ranNum = Math.round(((Math.random() * 100) / 10), 0);
      for (var j = 0; j < ranNum; j++) {
        var item = {
          // gravity: true,
          type: 1,
          x: i,
          y: (rows - j) - 1
        };
        worldArray.push(item);
      }
    }

    for (var i = 2; i < 30; i = i + 2) {
      worldArray.push({
        type: 1,
        x: i,
        y: 20,
        height: 1,
        width: 1,
        gravity: true
      });
    }

    worldArray.push({
      type: 0,
      x: 3,
      y: 3,
      height: 2,
      width: 1,
      gravity: true
    });

    return worldArray;
  }
  
  return {
    genTerrain: genTerrain
  };
};
