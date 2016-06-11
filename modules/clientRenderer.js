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
  var factor = 10;
  return point * factor;
}
