var World = require('../types/world');
module.exports = function() {
  var self = this;
  var genTerrain = function(rows, columns) {
    // var worldArray = [];
    // var previousNum = Math.round((Math.random() * 100)/ 6, 0);
    var worldArray = new World();
    for (var i = 0; i < columns; i++) {
      var ranNum = Math.round((Math.random() * 100) / 20, 0);
      for (var j = 0; j < ranNum; j++) {
        var item = {
          // gravity: true,
          type: 1,
          x: i,
          y: rows - j
        };
        worldArray.push(item);
      }
      // previousNum = previousNum + ranNum;
      //var column = []; 
      //for (var j = 0; j < ranNum; j++) {
      //  column[rows - j] = {
      //    type: 1
      //  }; 
      //}
      //worldArray.push(column);
    }
    // worldArray.push({
    //   type: 1,
    //   x: 2,
    //   y: 1,
    //   gravity: true
    // });
    for (var i = 2; i < 30; i = i + 2) {
      worldArray.push({
        type: 1,
        x: i,
        y: 2,
        gravity: true
      });
    }
    return worldArray;
  }
  return {
    genTerrain: genTerrain
  };
};