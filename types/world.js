var Blocks = require('./blocks'),
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
      for (var i = 0; i < this.length; i++) {          
        var item = self[i];                            
        if (item.x == x && item.y == y) {              
          return item;
        }
      }
      return null;
    },
    getPlayer: function() {
      var self = this;
      for (var i = 0; i < this.length; i++) {
        var item = self[i];
        if (item.type == 0) {
          return item;
        }
      }
      return null;
    },
    createBlock: function(type, x, y) {
      var block = Blocks.getBlock(type).properties;
      block.x = x;
      block.y = y;
      block.id = uuid.v4();
      self.push(block);
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
    refreshScreen: false,
    blocksToDelete: []
  }
  return (World);
}).call({});
