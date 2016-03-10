var TerrainGen = require('./modules/terrainGen')(),
    Renderer = require('./modules/renderer'),
    GameEngine = require('./modules/gameEngine'),
    Loader = require('./modules/loader');
if (process.argv[2] == 's') {
  //console.log('server');
  //process.exit();
  var MultiRenderer = require('./modules/multiRenderer');
  var world = TerrainGen.genTerrain();
  var renderer = new MultiRenderer(world);
  var gameEngine = new GameEngine(world, false);
  gameEngine.start();
  renderer.autoRender();
  console.log('Server running');
  // renderer.playerControls = gameEngine.playerControls;
} else if (process.argv[2] == 'm') {
  //console.log('Multi');
  //process.exit();
  var world = TerrainGen.genTerrain();
  var renderer = new Renderer(world);
  var gameEngine = new GameEngine(world, true);
  gameEngine.start();
  renderer.autoRender();
  renderer.playerControls = gameEngine.playerControls;
} else {
  //console.log('Single');
  //process.exit();
  var world = TerrainGen.genTerrain();
  var renderer = new Renderer(world);
  var gameEngine = new GameEngine(world, false);
  gameEngine.start();
  renderer.autoRender();
  renderer.playerControls = gameEngine.playerControls;
}
