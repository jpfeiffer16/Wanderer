var blessed = require('blessed'),
    program = blessed.program();

module.exports = function(worldArray) {
  //Do some sanity checks:
  if (!worldArray.toString().toLowerCase() == '[object array]') 
    throw 'Error: no worldArray passed to renderer';
  var self = this;
  
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


  setInterval(self.render, 300);

};
