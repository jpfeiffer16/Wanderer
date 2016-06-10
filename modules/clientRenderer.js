
var blessed = require('blessed'),
    program = blessed.program(),
    Blocks = require('../types/blocks'),
    blockTypes = Blocks.blockTypes,
    logger = require('./logger');


module.exports = function(terrain) {
  var self = this;
  var player = worldArray.getPlayer();
  
  setUpCanvas('game');

  self.worldArray = terrain;

  self.render = function() {

  }

  self.autoRender = function () {
    //setInterval(self.render, 50);
    requestAnimationFrame(self.render);
  }
};

function setUpCanvas(canvasId) {
}

//Returns an object with the x and y canvas points of a block
function blockToPoints(x, y) {
  var factor = 10;
  return {
    x: x * factor,
    y: y * factor
  }
}
