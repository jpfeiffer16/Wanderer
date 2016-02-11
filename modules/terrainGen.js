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
    worldArray.push({
      type: 1,
      x: 2,
      y: 2,
      gravity: true
    });
    //TODO: Attatch utility methods to worldArray here;
    worldArray.getBlock = getBlock;
    return worldArray;
  }
  return {
    genTerrain: genTerrain
  };
};


function getBlock(x, y) {                          
  var self = this;                                 
  for (var i = 0; i < this.length; i++) {          
    var item = self[i];                            
    if (item.x == x && item.y == y) {              
      return item;
    }       
  }         
  return null;
};
