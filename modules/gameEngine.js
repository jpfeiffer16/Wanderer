var Loader = require('./loader'),
    blockTypes = require('../types/blocks').blockTypes,
    logger = require('./logger'),
    PlayerControls = require('./playerControls'),
    StructureChecker = require('./structureChecker'),
    TesChecker = require('./tesChecker');
module.exports = function(worldArray) {
  // if (worldArray.getPlayer() == null)
  //   throw 'Error: No player found in specified world';
  var self = this;
  var playerControls = new PlayerControls(worldArray);
  var player = worldArray.getPlayer();
  self.loop = function() {
    //Check the forcast for huge-ass drops of rain and other assorted horrible weather.
    //if (Math.random() < .1) {
    //  var rainDropX = Math.round(Math.random() * 100);
    //  //Use a gravity-enabled block of dirt for now. But need to be changed once we start adding more blocks.
    //  var rainDrop = worldArray.createBlock(blockTypes.DIRT, rainDropX, 0);
    //  rainDrop.gravity = true;
    //}
    for (var i = 0; i < worldArray.length; i ++) {
      var item = worldArray[i];
      if ((item.x < 0 || item.x > worldArray.width ||
          item.y < 0 || item.y > worldArray.height)
          && item.type == blockTypes.BULLET) {
        worldArray.deleteBlockById(item.id);
      }
      //Gravity
      if (item.gravity) {
        if (worldArray.getBlock(item.x, item.y + item.height) == null) {
          item.changed = true;
          item.y++;
        }
      }
      if (item.type == blockTypes.BULLET) {
        var blocksAtLocation = worldArray.getBlocks(item.x, item.y);
        if (blocksAtLocation.length > 1) {
          //Colliding
          for (var i = 0; i < blocksAtLocation.length; i++) {
            worldArray.deleteBlockById(blocksAtLocation[i].id);
          }
        } else {
          //Not colliding, move on
          item.x += item.vx;
          item.y += item.vy;
        }
      }
      if (item.type == blockTypes.BOMB) {
        var blocksAtLocation = worldArray.getBlocks(item.x, item.y + 1);
        if (blocksAtLocation.length > 0) {
          //Colliding
          worldArray.deleteBlockById(item.id);
          for (var k = 0; k < 10; k++) {
            for (var j = 0; j < 10; j++) {
              if (Math.random() < .5) {
                worldArray.deleteBlock(item.x - 5 + k, item.y - 5 + j);
              }
            }
          }
        }
      }
    }
  };
  self.utilities = {
    getPlayerCoords: function() {
      return {
        x: player.x,
        y: player.y
      }
    }
  },
  self.playerControls = {
    moveRight: function() {
      playerControls.moveRight(player.id);
    },
    moveLeft: function() {
      playerControls.moveLeft(player.id);
    },
    digRight: function(topBlock, bottomBlock) {
      playerControls.digRight(player.id, topBlock, bottomBlock);
    },
    digLeft: function(topBlock, bottomBlock) {
      playerControls.digLeft(player.id, topBlock, bottomBlock);
    },
    digDown: function() {
      playerControls.digDown(player.id);
    },
    placeDown: function() {
      playerControls.placeDown(player.id);
    },
    placeUp: function() {
      playerControls.placeUp(player.id);
    },
    jump: function() {
      playerControls.jump(player.id);
    },
    shootLeft: function () {
      playerControls.shootLeft(player.id);
    },
    shootRight: function () {
      playerControls.shootRight(player.id);
    },
    dropBomb: function () {
      playerControls.dropBomb(player.id);
    },
    reRender: function() {
      worldArray.refreshScreen = true;
    },
    getPlayer: function() {
      //Re-add our reference to the player
      player = worldArray.getPlayer();  
    },
    dropTes: function() {
      playerControls.dropTes(player.id);
    },
    moveTesLeft: function() {
      playerControls.moveTesLeft(player.id);
    },
    moveTesRight: function() {
      playerControls.moveTesRight(player.id);
    },
    zoomToGround: function() {
      playerControls.zoomToGround(player.id);
    }
  };
  
  self.start = function() {
    setInterval(self.loop, 200);
    setInterval(function() {
      StructureChecker.checkForLooseBlocks(worldArray);
    }, 800);
    setInterval(function() {
      TesChecker.check(worldArray);
    }, 800);
  };
};
