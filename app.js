var TerrainGen = require('./modules/terrainGen')(),
    Renderer = require('./modules/renderer'),
    MultiRenderer = require('./modules/multiRenderer'),
    GameEngine = require('./modules/gameEngine'),
    Loader = require('./modules/loader.js');
var terrain; 
if (process.argv[2] == 'server') {
  console.log('server');
  var world = TerrainGen.genTerrain();
  var renderer = new MultiRenderer(world);
  var gameEngine = new GameEngine(world, false);
  gameEngine.start();
  renderer.autoRender();
  console.log('Server running');
  // renderer.playerControls = gameEngine.playerControls;
} else if (process.argv[2] == 'multiplayer') {
  var world = TerrainGen.genTerrain();
  var renderer = new Renderer(world);
  var gameEngine = new GameEngine(world, true);
  gameEngine.start();
  renderer.autoRender();
  renderer.playerControls = gameEngine.playerControls;
} else {
  var world = TerrainGen.genTerrain();
  var renderer = new Renderer(world);
  var gameEngine = new GameEngine(world, false);
  gameEngine.start();
  renderer.autoRender();
  renderer.playerControls = gameEngine.playerControls;
}