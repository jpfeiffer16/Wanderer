var TerrainGen = require('./modules/terrainGen')(),
    Renderer = require('./modules/renderer'),
    GameEngine = require('./modules/gameEngine'),
    Loader = require('./modules/loader.js');
var terrain; 
if (process.argv[2] == 'server') {
  console.log('server');
} else if (process.argv[2] == 'multiplayer') {
  console.log('client');
} else {
  var world = TerrainGen.genTerrain();
  var renderer = new Renderer(world);
  var gameEngine = new GameEngine(world);
  gameEngine.start();
  renderer.autoRender();
  renderer.playerControls = gameEngine.playerControls;
}