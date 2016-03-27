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
} else if (process.argv[2] == 'm') {
  console.log(process.argv[3]);
  var server = process.argv[3] != undefined ? process.argv[3] : 'http://localhost:3030';
  var world = TerrainGen.genTerrain();
  var renderer = new Renderer(world);
  var reactor = new Reactor(world, server);
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
