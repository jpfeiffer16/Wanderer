var blessed = require('blessed'),
    program = blessed.program();

module.exports = function(genTerrain) {
  //Do some sanity checks:
  if (typeof(genTerrain) != 'function') 
    throw 'Error: no terrain generator passed to renderer';
  var worldArray = genTerrain(program.rows, program.columns);
  var self = this;

  program.clear();
  program.alternateBuffer();

  program.key('d', function() {
    if (self.playerControls != undefined) {
      self.playerControls.moveRight();
    }
  });
  
  program.key('a', function() {
    if (self.playerControls != undefined) {
      self.playerControls.moveLeft();
    }
  });
  program.key('e', function() {
    if (self.playerControls != undefined) {
      self.playerControls.digRight();
    }
  });
   program.key('q', function() {
    if (self.playerControls != undefined) {
      self.playerControls.digLeft();
    }
  });
  self.render = function() {
    if (worldArray.refreshScreen) {
      program.clear();
    }
    for (var i = 0; i < worldArray.length; i++) {
      var item = worldArray[i];
      if (item.changed || item.changed == undefined || worldArray.refreshScreen) {
        renderBlock(item);    
      }
      item._x = item.x;
      item._y = item.y;
    }
    worldArray.refreshScreen = false;
  }

  self.worldArray = worldArray;
  
  self.autoRender = function () {
    setInterval(self.render, 50);
  }
  function renderBlock(block) {
    //Render it here 
    if (block._x != undefined && block._y != undefined) {
      program.move(block._x, block._y);
      program.write(' ');
    }
    if (block.type == 1) { 
      program.move(block.x, block.y);
      program.write('█');
      block.changed = false;
    }
    if (block.type == 0) {
      program.move(block.x, block.y);
      program.write('x');
      program.move(block.x, block.y + 1);
      program.write('"');
    }
  }
};
