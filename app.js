var TerrainGen = require('./modules/terrainGen')(),
    Renderer = require('./modules/renderer'),
    Reactor = require('./modules/reactor'),
    GameEngine = require('./modules/gameEngine'),
    Loader = require('./modules/loader');
if (process.argv[2] == 's') {
  var ServerRenderer = require('./modules/serverRenderer');
  var world = TerrainGen.genTerrain();
  var renderer = new ServerRenderer(world);
  var gameEngine = new GameEngine(world, false);
  gameEngine.start();
  renderer.autoRender();
  console.log('Server running');
  // renderer.playerControls = gameEngine.playerControls;
} else if (process.argv[2] == 'm') {
  //TODO: Need to change this up to use the new Reactor type instead of a GameEngine when the module is finished.
  var world = TerrainGen.genTerrain();
  var renderer = new Renderer(world);
  var reactor = new Reactor(world);
  // var gameEngine = new GameEngine(world, true);
  // gameEngine.start();
  renderer.autoRender();
  renderer.playerControls = reactor.playerControls;
  renderer.utilities = reactor.utilities;
} else {
  var world = TerrainGen.genTerrain();
  var renderer = new Renderer(world);
  var gameEngine = new GameEngine(world, false);
  gameEngine.start();
  renderer.autoRender();
  renderer.playerControls = gameEngine.playerControls;
  renderer.utilities = gameEngine.utilities;
}
