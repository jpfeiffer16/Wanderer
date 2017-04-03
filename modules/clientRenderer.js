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
  addLoader();
  var loaderPresent = true;

  
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
  attatchKey('t', function() {
    if (self.playerControls != undefined) {
      self.playerControls.dropTnt();
    }
  });
  attatchKey('p', function() {
    if (self.playerControls != undefined) {
      self.playerControls.detTnt();
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
  attatchKey('=', function() {
    zoomCanvas(1);
  });
  attatchKey('-', function() {
    zoomCanvas(-1);
  });

  
  self.worldArray = terrain;

  self.render = function() {
    var playerCoords = self.utilities.getPlayerCoords();
    screenOffsetX = Math.round(playerCoords.x - (pointsToBlock(renderCtx.canvas.width / 2)));
    screenOffsetY = Math.round(playerCoords.y - (pointsToBlock(renderCtx.canvas.height / 2)));
    var screenMinX = screenOffsetX;
    var screenMaxX = screenOffsetX + pointsToBlock(renderCtx.canvas.width);
    var screenMinY = screenOffsetY;
    var screenMaxY = screenOffsetY + pointsToBlock(renderCtx.canvas.height);
    renderCtx.clearRect(0, 0, renderCtx.canvas.width, renderCtx.canvas.height);
    worldArray.forEach(function (block) {
      if (block.x > screenMinX && block.x < screenMaxX &&
          block.y > screenMinY && block.y < screenMaxY) {
        renderCtx.fillStyle = "rgb(0,0,0)";
        if (block.type == blockTypes.PLAYER && loaderPresent)
          removeLoader();
        if (block.hasImageRep) 
        {
          //TODO: Image stuff here
          var image = new Image();
          image.src = block.imageRep;
          renderCtx.drawImage(
              image,
              blockToPoints(block.x - screenOffsetX),
              blockToPoints(block.y - screenOffsetY),
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
                blockToPoints(block.x - screenOffsetX),
                blockToPoints(block.y - screenOffsetY),
                blockToPoints(block.width),
                blockToPoints(block.height)
              );
          } else {
            block.hasImageRep = false;
            renderCtx.fillRect (
                blockToPoints(block.x - screenOffsetX),
                blockToPoints(block.y - screenOffsetY),
                blockToPoints(block.width),
                blockToPoints(block.height)
              );
          }
        } else {
          renderCtx.fillRect (
              blockToPoints(block.x - screenOffsetX),
              blockToPoints(block.y - screenOffsetY),
              blockToPoints(block.width),
              blockToPoints(block.height)
            );
        }
      }
    });
    requestAnimationFrame(self.render);
  }

  self.autoRender = function () {
    requestAnimationFrame(self.render);
  }
};
function setUpCanvas(canvasId) {
  var canvas = document.getElementById(canvasId);
  if (canvas == null) {
    canvas = document.createElement('canvas');
    document.getElementsByTagName('body')[0].appendChild(canvas);
  }
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;

  window.addEventListener('resize', function(e) {
    //TODO: Do resizing logic here
    //var dec = prevWindowWidth / window.innerWidth;
    //FACTOR = Math.round(FACTOR * dec);
    //prevWindowWidth = window.innerWidth.valueOf;
  });

  return canvas.getContext('2d');
}

function addLoader() {
  var backdrop = document.createElement('div');
  backdrop.id = 'loader';
  backdrop.style.position = 'absolute';
  backdrop.style.width = '100%';
  backdrop.style.zIndex = '100';
  backdrop.style.height = '100%';
  backdrop.style.top = '0';
  backdrop.style.left = '0';
  backdrop.style.background = 'white';
  backdrop.style.backgroundImage = 'url(loading.gif)';
  backdrop.style.backgroundPosition = 'center';
  backdrop.style.backgroundSize = '10%';
  backdrop.style.backgroundRepeat = 'no-repeat';
  document.body.appendChild(backdrop);
}

function removeLoader() {
  (function check() {
    var loader = document.getElementById('loader');
    if (loader != null)
      loader.remove()
    else
      setTimeout(check, 300);

  })();
}

var FACTOR = Math.round(window.innerWidth / 106);
//Returns an object with the x and y canvas points of a block
function blockToPoints(point) {
  return point * FACTOR;
}

function zoomCanvas(direction) {
  switch (direction) {
    case 1:
      FACTOR += 10;
      break;
    case -1:
      FACTOR -= 10;
      break;
  }
}

function pointsToBlock(blockPos) {
  var point = blockPos / FACTOR; 
  return Math.round(point);
}

var keys = [];

document.addEventListener('keydown', function(e) {
  //if (e.key == key) callback();
  var matches = keys.filter(function(item) {
    return item.key == e.key;
  });
  matches.forEach(function(item) {
    item.callback();
  });
});

function attatchKey(key, callback) {
  keys.push({key, callback});
}
