var Blocks = require('./blocks'),
    Loader = require('../modules/loader'),
    blockTypes = Blocks.blockTypes,
    uuid = require('node-uuid');
module.exports = (function() {
  function World() {
    var world = Object.create(Array.prototype);
    world = (Array.apply(world, arguments) || world);
    World.injectClassMethods(world);
    return world;
  };
  
  World.injectClassMethods = function (world) {
    for (var method in World.prototype){
      if (World.prototype.hasOwnProperty( method )){
        world[ method ] = World.prototype[ method ];
      }
    }
    return(world);
  };
  
  World.prototype = {
    getBlock:  function(x, y) {
      var self = this;
      for (var i = 0; i < self.length; i++) {          
        var item = self[i];                            
        if (item.x == x && item.y == y) {              
          return item;
        }
      }
      return null;
    },
    getBlockById: function(id) {
      for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (item.id == id) {
          return item;
        }
      }
      return null;
    },
    updateBlockById: function(id, newBlock) {
      for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (item.id == id) {
          item = newBlock;
          newBlock.changed = true;
        }
      }
      return null;
    },
    getPlayer: function(playerId) {
      var self = this;
			var returnFirst = false;
      if (playerId == undefined) {
				returnFirst = true;	
      }
      for (var i = 0; i < this.length; i++) {
        var item = self[i];
        if (item.type == 0) {
					if (returnFirst)
						return item;
					if (item.id = playerId)
						return item;
        }
      }
      return null;
    },
		createPlayer: function(x, y) {
			var newPlayer = Blocks.getBlock(blockTypes.PLAYER).properties;
      newPlayer.x = x;
      newPlayer.y = y;
			this.push(newPlayer);
			return newPlayer;
		},
    createBlock: function(type, x, y) {
      var block = Blocks.getBlock(type).properties;
      block.x = x;
      block.y = y;
      block.id = uuid.v4();
      this.push(block);
      return block;
    },
    deleteBlock: function(x, y) {
      var self = this;
      var index = null;
      for (var i = 0; i < this.length; i++) {          
        var item = self[i];                            
        if (item.x == x && item.y == y) {              
          index = i;
          break;
        }
      }
      if (index != null) {
        self.splice(index, 1);
      }
    },
    saveJson: function() {
      Loader.saveFile('./world.json', JSON.stringify(this), function() {
        console.log('Done saving');
      });
      // return JSON.stringify(worldArray);
    },
    restoreFromJson: function (json) {
      var self = this;
      Loader.loadFile('./world.json', function(data) {
        self.length = 0;
        var blocks = JSON.parse(data);
        for (var i = 0; i < blocks.length; i++) {
          self.push(blocks[i]);
        }
        self.refreshScreen = true;
      });
    },
    refreshScreen: false,
    blocksToDelete: []
  }
  return (World);
}).call({});
