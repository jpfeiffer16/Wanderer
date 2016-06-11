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
    renderCtx.clearRect(0, 0, renderCtx.canvas.width, renderCtx.canvas.height);
    worldArray.forEach(function (block) {

      renderCtx.fillStyle = "rgb(0,0,0)";
      renderCtx.fillRect (
          blockToPoints(block.x),
          blockToPoints(block.y),
          blockToPoints(block.width),
          blockToPoints(block.height)
        );
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

//Returns an object with the x and y canvas points of a block
function blockToPoints(point) {
  var factor = 3;
  return point * factor;
}

function attatchKey(key, callback) {
  document.addEventListener('keydown', function(e) {
    if (e.key == key) callback();
  });
}
