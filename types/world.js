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
    }
  }
  return (World);
}).call({});