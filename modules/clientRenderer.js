var Blocks = require('../types/blocks'),
    blockTypes = Blocks.blockTypes;
    //logger = require('./logger');


module.exports = function(terrain) {
  var self = this;
  var worldArray = terrain;
  var player = worldArray.getPlayer();
  var screenOffsetX = 0;
  var screenOffsetY = 0;
  
  var renderCtx = setUpCanvas('game');

  
  attatchKey('w', function() {
    if (self.playerControls != undefined) {
      self.playerControls.jump();
    }
  });
  attatchKey('z', function() {
    if (self.playerControls != undefined) {
      self.playerControls.digLeft(false, true);
    }
  });
  attatchKey('x', function() {
    if (self.playerControls != undefined) {
      self.playerControls.digRight(false, true);
    }
  });
  attatchKey('d', function() {
    if (self.playerControls != undefined) {
      self.playerControls.moveRight();
    }
  });
  attatchKey('a', function() {
    if (self.playerControls != undefined) {
      self.playerControls.moveLeft();
    }
  });
  attatchKey('e', function() {
    if (self.playerControls != undefined) {
      self.playerControls.digRight(true, false);
    }
  });
  attatchKey('q', function() {
    if (self.playerControls != undefined) {
      self.playerControls.digLeft(true, false);
    }
  });
  attatchKey('v', function() {
    if (self.playerControls != undefined) {
      self.playerControls.digDown();
    }
  });
  attatchKey('g', function() {
    if (self.playerControls != undefined) {
      self.playerControls.placeDown();
    }
  });
  attatchKey('r', function() {
    if (self.playerControls != undefined) {
      self.playerControls.placeUp();
    }
  });
  attatchKey('u', function() {
    if (self.playerControls != undefined) {
      self.playerControls.shootLeft();
    }
  });
  attatchKey('i', function() {
    if (self.playerControls != undefined) {
      self.playerControls.shootRight();
    }
  });
  attatchKey('h', function() {
    if (self.playerControls != undefined) {
      self.playerControls.dropBomb();
    }
  });
  attatchKey('b', function() {
    if (self.playerControls != undefined) {
      self.playerControls.dropTes();
    }
  });
  attatchKey('j', function() {
    if (self.playerControls != undefined) {
      self.playerControls.moveTesLeft();
    }
  });
  attatchKey('k', function() {
    if (self.playerControls != undefined) {
      self.playerControls.moveTesRight();
    }
  });
  attatchKey('l', function() {

    if (self.playerControls != undefined) {
      self.playerControls.zoomToGround();
    }
  });

  
  self.worldArray = terrain;

  self.render = function() {
    var playerCoords = self.utilities.getPlayerCoords();
    //screenOffsetX = Math.round(playerCoords.x - (pointsToBlock(renderCtx.canvas.width / 2)));
    //screenOffsetY = Math.round(playerCoords.y - (pointsToBlock(renderCtx.canvas.height / 2)));
    screenOffsetX = playerCoords.x - 10;
    screenOffsetY = playerCoords.y - 10;
    var screenMinX = screenOffsetX;
    var screenMaxX = screenOffsetX + pointsToBlock(renderCtx.canvas.width);
    //var screenMaxX = screenOffsetX + 100;
    var screenMinY = screenOffsetY;
    var screenMaxY = screenOffsetY + pointsToBlock(renderCtx.canvas.height);
    //var screenMaxY = screenOffsetY + 100;
    renderCtx.clearRect(0, 0, renderCtx.canvas.width, renderCtx.canvas.height);
    worldArray.forEach(function (block) {
      if (block.x > screenMinX && block.x < screenMaxX &&
          block.y > screenMinY && block.y < screenMaxY) {
        renderCtx.fillStyle = "rgb(0,0,0)";
        if (block.hasImageRep) 
        {
          //TODO: Image stuff here
          var image = new Image();
          image.src = block.imageRep;
          renderCtx.drawImage(
              image,
              blockToPoints(block.x) - screenOffsetX,
              blockToPoints(block.y) - screenOffsetY,
              blockToPoints(block.width),
              blockToPoints(block.height)
            );
        } else if (block.hasImageRep == undefined) {
          var blockType = Blocks.getBlock(block.type);
          if (blockType.imageRep != undefined) {
            block.hasImageRep = true;
            block.imageRep = blockType.imageRep;
            var image = new Image();
            image.src = block.imageRep;
            renderCtx.drawImage(
                image,
                blockToPoints(block.x) - screenOffsetX - 100,
                blockToPoints(block.y) - screenOffsetY - 100,
                blockToPoints(block.width),
                blockToPoints(block.height)
              );
          } else {
            block.hasImageRep = false;
          }
        } else {
          renderCtx.fillRect (
              blockToPoints(block.x) - screenOffsetX,
              blockToPoints(block.y) - screenOffsetY,
              blockToPoints(block.width),
              blockToPoints(block.height)
            );
        }
      }
    });
    requestAnimationFrame(self.render);
  }

  self.autoRender = function () {
    //setInterval(self.render, 50);
    requestAnimationFrame(self.render);
  }
};

function setUpCanvas(canvasId) {
  var canvas = document.getElementById(canvasId);
  if (canvas == null) {
    canvas = document.createElement('canvas');
    canvas.wdith = 500;
    canvas.height = 300;
    document.getElementsByTagName('body')[0].appendChild(canvas);
  }
  return canvas.getContext('2d');
}
var FACTOR = 6;
//Returns an object with the x and y canvas points of a block
function blockToPoints(point) {
  return point * FACTOR;
}

function pointsToBlock(blockPos) {
  //var list = [];
  //for (var i = 0; i < 400; i++) {
  //  list.push(i * FACTOR);
  //}
  var point = blockPos / FACTOR; 
  //list.forEach(function (blockCoord) {
  //  if (blockCoord > point)
  //    return blockCoord; 
  //});
  return Math.round(point);
}

function attatchKey(key, callback) {
  //TODO: This should be fixed to use one event handler
  document.addEventListener('keydown', function(e) {
    if (e.key == key) callback();
  });
}
