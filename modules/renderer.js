var blessed = require('blessed'),
    program = blessed.program();

module.exports = function(genTerrain) {
  //Do some sanity checks:
  if (typeof(genTerrain) != 'function') 
    throw 'Error: no terrain generator passed to render';
  var worldArray = genTerrain(program.rows, program.columns);
  var self = this;


  program.clear();
  //program.alternateBuffer();
  
  self.render = function() {
    for (var i = 0; i < worldArray.length; i++) {
      var item = worldArray[i];
      if (item.changed || item.changed == undefined) {
        //Render it here 
        program.move(item.x, item.y);
        program.write('#');
        item.changed = false;
      }
    }
  }

  self.worldArray = worldArray;


  setInterval(self.render, 300);

};
