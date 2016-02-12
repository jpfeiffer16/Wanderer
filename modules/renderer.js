var blessed = require('blessed'),
    program = blessed.program();

module.exports = function(genTerrain) {
  //Do some sanity checks:
  if (typeof(genTerrain) != 'function') 
    throw 'Error: no terrain generator passed to renderer';
  var worldArray = genTerrain(program.rows, program.columns);
  var self = this;

  program.clear();
  
  self.render = function() {
    for (var i = 0; i < worldArray.length; i++) {
      var item = worldArray[i];
      if (item.changed || item.changed == undefined) {
        //Render it here 
        
        if (item._x != undefined && item._y != undefined) {
          program.move(item._x, item._y);
          program.write(' ');
        }
        if (item.type = 1) { 
          program.move(item.x, item.y);
          program.write('█');
          item.changed = false;
        }
        if (item.type = 0) {
          program.move(item.x, item.y);
          program.write('x');
          program.move(item.x, item.y + 1);
          program.write('"');
        }
      }
      item._x = item.x;
      item._y = item.y;
    }
  }

  self.worldArray = worldArray;
  
  self.autoRender = function () {
    setInterval(self.render, 50);
  }

};
