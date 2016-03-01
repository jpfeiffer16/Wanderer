var blessed = require('blessed'),
    program = blessed.program();

module.exports = function(genTerrain) {
  //Do some sanity checks:
  if (typeof(genTerrain) != 'function') 
    throw 'Error: no terrain generator passed to renderer';
  var self = this;
  var screen = blessed.screen();
  var worldArray = genTerrain(screen.height, screen.width);
  var screenOffsetX = 0;
  var screenOffsetY = 0;
  program.clear();
  program.alternateBuffer();
  screen.key(['escape', 'C-c'], function(ch, key) {
      return process.exit(0);
  });
  screen.key('y', function() {
    if (self.playerControls != undefined) {
      self.playerControls.reRender();
    }
  });
  screen.key('w', function() {
    if (self.playerControls != undefined) {
      self.playerControls.jump();
    }
  });
  screen.key('z', function() {
    if (self.playerControls != undefined) {
      self.playerControls.digLeft(false, true);
    }
  });
  screen.key('x', function() {
    if (self.playerControls != undefined) {
      self.playerControls.digRight(false, true);
    }
  });
  screen.key('d', function() {
    if (self.playerControls != undefined) {
      self.playerControls.moveRight();
    }
  });
  screen.key('a', function() {
    if (self.playerControls != undefined) {
      self.playerControls.moveLeft();
    }
  });
  screen.key('e', function() {
    if (self.playerControls != undefined) {
      self.playerControls.digRight(true, false);
    }
  });
  screen.key('q', function() {
    if (self.playerControls != undefined) {
      self.playerControls.digLeft(true, false);
    }
  });
  screen.key('v', function() {
    if (self.playerControls != undefined) {
      self.playerControls.digDown();
    }
  });
  screen.key('g', function() {
    if (self.playerControls != undefined) {
      self.playerControls.placeDown();
    }
  });
  screen.key('r', function() {
    if (self.playerControls != undefined) {
      self.playerControls.placeUp();
    }
  });
  screen.key('m', function() {
    if (self.playerControls != undefined) {
      self.playerControls.saveJson();
    }
  });
  screen.key('n', function() {
    if (self.playerControls != undefined) {
      self.playerControls.restoreFromJson();
    }
  });
  self.render = function() {
    if (worldArray.refreshScreen) {
      program.clear();
    }
    for (var i = 0; i < worldArray.length; i++) {
      var item = worldArray[i];
      if (item.x > screenOffsetX && item.x < screenOffsetX + screen.width &&
          item.y > screenOffsetY && item.y < screenOffsetY + screen.height) {
        if (item.changed || item.changed == undefined || worldArray.refreshScreen) {
          renderBlock(item);    
        }
      }
      item._x = item.x;
      item._y = item.y;
    }
    if (worldArray.blocksToDelete.length > 0) {
      for (var i = 0; i < worldArray.blocksToDelete.length; i++) {
        block = worldArray.blocksToDelete[i];
        program.move(block.x, block.y);
        program.write(' ');
      }
      worldArray.blocksToDelete = [];
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
      for (var i = 0; i < block.width; i++) {
        for (var j = 0; j < block.height; j++) {
          program.move(block._x + i + screenOffsetX, block._y + j + screenOffsetY);
          program.write(' ');
        }
      } 
    }
    program.move(block.x + screenOffsetX, block.y + screenOffsetY);
    if (block.type == 1) { 
      program.write('█');
      block.changed = false;
    }
    if (block.type == 0) {
      program.write('x');
      program.move(block.x, block.y + 1);
      program.write('|');
    }
  }
};
