var blessed = require('blessed'),
    program = blessed.program(),
    Blocks = require('../types/blocks'),
    blockTypes = Blocks.blockTypes,
    logger = require('./logger');

module.exports = function(terrain) {
  //Do some sanity checks:
  // if (typeof(terrain) != 'World') 
  //   throw 'Error: no world passed to renderer';
  var self = this;
  var screen = blessed.screen({
    //These were screwing crap up:
    // smartCSR: true
    // program: program
  });
  var worldArray = terrain
  var player = worldArray.getPlayer();
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
  screen.key('u', function() {
    if (self.playerControls != undefined) {
      self.playerControls.shootLeft();
    }
  });
  screen.key('i', function() {
    if (self.playerControls != undefined) {
      self.playerControls.shootRight();
    }
  });
  screen.key('h', function() {
    if (self.playerControls != undefined) {
      self.playerControls.dropBomb();
    }
  });
  screen.key('t', function() {
    if (self.playerControls != undefined) {
      self.playerControls.dropTnt();
    }
  });
  screen.key('p', function() {
    if (self.playerControls != undefined) {
      self.playerControls.detTnt();
    }
  });
  screen.key('m', function() {
    if (self.playerControls != undefined) {
      worldArray.saveJson();
    }
  });
  screen.key('n', function() {
    if (self.playerControls != undefined) {
      worldArray.restoreFromJson();
      //Re-add a ref to the player
      self.playerControls.getPlayer();
    }
  });
  screen.key('b', function() {
    if (self.playerControls != undefined) {
      self.playerControls.dropTes();
    }
  });
  screen.key('j', function() {
    if (self.playerControls != undefined) {
      self.playerControls.moveTesLeft();
    }
  });
  screen.key('k', function() {
    if (self.playerControls != undefined) {
      self.playerControls.moveTesRight();
    }
  });
  screen.key('m', function() {
    self.playerControls.rotateTes();
  });
  screen.key('l', function() {

    if (self.playerControls != undefined) {
      self.playerControls.zoomToGround();
    }
  });
  self.render = function() {
    var playerCoords = self.utilities.getPlayerCoords();
    if (playerCoords.x > screenOffsetX + screen.width - 30) {
      if (self.playerControls != undefined) {
        self.playerControls.reRender();
      }
    }
    if (playerCoords.x < screenOffsetX + 30) {
      if (self.playerControls != undefined) {
        self.playerControls.reRender();
      }
    }
    if (playerCoords.y > screenOffsetY + screen.height - 5) {
      if (self.playerControls != undefined) {
        self.playerControls.reRender();
      }
    }
    if (playerCoords.y < screenOffsetY) {
      if (self.playerControls != undefined) {
        self.playerControls.reRender();
      }
    }
    if (worldArray.refreshScreen) {
      program.clear();
      screenOffsetX = playerCoords.x - 40;
      screenOffsetY = playerCoords.y - 20;
    }
    var blocksToRender = [];
    for (var i = 0; i < worldArray.length; i++) {
      var item = worldArray[i];
      if (item.x > screenOffsetX && item.x < screenOffsetX + screen.width &&
          item.y > screenOffsetY && item.y < screenOffsetY + screen.height) {
        if (item.changed || item.changed == undefined || worldArray.refreshScreen || 
          item.x != item._x || item.y != item._y) {
          whiteBlock(item);
          blocksToRender.push(item);
        }
      }
      item._x = item.x;
      item._y = item.y;
    }
    if (worldArray.blocksToDelete.length > 0) {
      for (var i = 0; i < worldArray.blocksToDelete.length; i++) {
        var block = worldArray.blocksToDelete[i];
        program.move(block.x - screenOffsetX, block.y - screenOffsetY - 1);
        program.write(' ');
      }
      worldArray.blocksToDelete = [];
    }
    blocksToRender.forEach(function(thisBlock) {
      renderBlock(thisBlock); 
    });
    worldArray.refreshScreen = false;
  }

  self.worldArray = worldArray;
  
  self.autoRender = function () {
    setInterval(self.render, 50);
  }
  function whiteBlock(block) {
    //White it here
    if (block._x != undefined && block._y != undefined) {
      for (var i = 0; i < block.width; i++) {
        for (var j = 0; j < block.height; j++) {
          program.move(block._x + i - screenOffsetX, block._y + j - screenOffsetY - 1);
          program.write(' ');
        }
      }
    }
  }
  function renderBlock(block) {
    //Render it here
    var rep = Blocks.getBlock(block.type).rep;
    for (var i = 0; i < rep.length; i++) {
      program.move(block.x - screenOffsetX, block.y + i - screenOffsetY - 1);
      program.write(rep[i]);
    }
    if (block.type != blockTypes.PLAYER) {
      block.changed = false;
    }
  }
};
