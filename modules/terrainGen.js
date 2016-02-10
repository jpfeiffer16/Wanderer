module.exports = function() {
  var self = this;
  var genTerrain = function(rows, columns) {
    var worldArray = [];
    for (var i = 0; i < columns; i++) {
      var ranNum = Math.round((Math.random() * 100) / 6, 0);
      for (var j = 0; j < ranNum; j++) {
        var item = {
          type: 1,
          x: i,
          y: rows - j
        };
        worldArray.push(item);
      }
      //var column = []; 
      //for (var j = 0; j < ranNum; j++) {
      //  column[rows - j] = {
      //    type: 1
      //  }; 
      //}
      //worldArray.push(column);
    }
    return worldArray;
  }
  return {
    genTerrain: genTerrain
  };
};
