var Blocks = require('./blocks'),
    Loader = require('../modules/loader'),
    blockTypes = Blocks.blockTypes,
    uuid = require('node-uuid'),
    logger = require('../modules/logger');
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
    //Gets all blocks at a certain location
    getBlocks: function(x, y) {
      var self = this;
      var list = [];
      for (var i = 0; i < self.length; i++) {          
        var item = self[i];     
        if (item.x == x && item.y == y) {              
          list.push(item);
        }
      }
      return list;
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
          var replaceWith = JSON.parse(JSON.stringify(newBlock));
          replaceWith.changed = true;
          replaceWith._x = item._x;
          replaceWith._y = item._y;
          //Keep the original id to avoid inadvertant data collision
          replaceWith.id = id;
          this[i] = replaceWith;
        }
      }
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
          if (item.id == playerId)
            return item;
        }
      }
      return null;
    },
    createPlayer: function(x, y) {
      var newPlayer = Blocks.getBlock(blockTypes.PLAYER).properties;
      newPlayer.x = x;
      newPlayer.y = y;
      newPlayer.changed = true;
      newPlayer.id = uuid.v4();
      this.push(newPlayer);
      this.blocksToAdd.push(newPlayer);
      return newPlayer;
    },
    createBlock: function(type, x, y) {
      var block = Blocks.getBlock(type).properties;
      block.x = x;
      block.y = y;
      block.id = uuid.v4();
      this.push(block);
      this.blocksToAdd.push(JSON.parse(JSON.stringify(block)));
      return block;
    },
    //Allows to add a pre-fabed block. Useful for multiplayer
    addBlock: function(block) {
      if (block != null && block.id != undefined) {
        for (var i = 0; i < this.length; i++) {
          if (this[i].id == block.id) return;
        }
        this.push(block);
      }
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
        var toReturn = JSON.parse(JSON.stringify(self[index]));
        self.blocksToDelete.push(toReturn);
        self.splice(index, 1);
      }
      return toReturn;
    },
    deleteBlockById: function(blockId) {
      if (blockId != undefined) {
        var self = this;
        var index = null;
        for (var i = 0; i < this.length; i++) {          
          var item = self[i];                            
          if (item.id == blockId) {              
            index = i;
            break;
          }
        }
        if (index != null) {
          var toReturn = JSON.parse(JSON.stringify(self[index]));
          self.blocksToDelete.push(toReturn);
          self.splice(index, 1);
        }
        return toReturn;
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
      if (json != undefined) {
        var newWorld = JSON.parse(json);
        self.length = 0;
        for (var i = 0; i < newWorld.length; i++) {
          self.push(newWorld[i]);
        }
        return;
      }
      Loader.loadFile('./world.json', function(data) {
        self.length = 0;
        var blocks = JSON.parse(data);
        for (var i = 0; i < blocks.length; i++) {
          self.push(blocks[i]);
        }
        self.refreshScreen = true;
      });
    },
    restoreFromFile: function (path) {
      var self = this;
      Loader.loadFile(path, function(json) {
        var newWorld = JSON.parse(json);
        self.length = 0;
        for (var i = 0; i < newWorld.length; i++) {
          self.push(newWorld[i]);
        }
        self.refreshScreen = true;
        return;
      });
    },
    refreshScreen: false,
    blocksToDelete: [],
    blocksToAdd: [],
    width: 0,
    height: 0
  }
  return (World);
}).call({});
