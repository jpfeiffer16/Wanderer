var Blocks = require('../types/blocks'),
    blockTypes = Blocks.blockTypes;
    //logger = require('./logger');


module.exports = function(terrain) {
  var self = this;
  var worldArray = terrain;
  var player = worldArray.getPlayer();
  
  var renderCtx = setUpCanvas('game');

  self.worldArray = terrain;

  self.render = function() {
    
    requestAnimationFrame(self.render);
  }

  self.autoRender = function () {
    //setInterval(self.render, 50);
    requestAnimationFrame(self.render);
  }
};

function setUpCanvas(canvasId) {
  if (document.getElementById(canvasId) == null) {
    var canvas = document.createElement('canvas');
    canvas.wdith = 500;
    canvas.height = 300;
    document.getElementsByTagName('body')[0].appendChild(canvas);
  }
  return canvas.getContext('2d');
}

//Returns an object with the x and y canvas points of a block
function blockToPoints(x, y) {
  var factor = 10;
  return {
    x: x * factor,
    y: y * factor
  }
}
