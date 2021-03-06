//This file will be browserified and served to the browser
window.setupGame = function() {
  var ClientRenderer = require('./modules/clientRenderer'),
      TerrainGen = require('./modules/terrainGen')(),
      Reactor = require('./modules/reactor');

  var world = TerrainGen.genTerrain();
  var renderer = new ClientRenderer(world);
  var reactor = new Reactor(world, location.href);
  renderer.autoRender();
  renderer.playerControls = reactor.playerControls;
  renderer.utilities = reactor.utilities;
};

setupGame();
