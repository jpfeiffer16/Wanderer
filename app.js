var terrainGen = require('./modules/terrainGen')(),
    Renderer = require('./modules/renderer'),
    GameEngine = require('./modules/gameEngine'),
    Loader = require('./modules/loader.js');
var terrain; 
// if (process.argv[2] != undefined) {
//   Loader.loadFile(process.argv[2], function(terrain) {
//     var renderer = new Renderer(terrainGen.genTerrain);
//     var gameEngine = new GameEngine(renderer.worldArray);
// 
//     gameEngine.start();
//     renderer.autoRender();
//     renderer.playerControls = gameEngine.playerControls;
//   });
// } else {
//   //terrain = terrainGen.genTerrain;
//   var renderer = new Renderer(terrainGen.genTerrain);
//   var gameEngine = new GameEngine(renderer.worldArray);
// 
//   gameEngine.start();
//   renderer.autoRender();
//   renderer.playerControls = gameEngine.playerControls;
// }
var renderer = new Renderer(terrainGen.genTerrain);
//console.dir(renderer.worldArray);
var gameEngine = new GameEngine(renderer.worldArray);

gameEngine.start();
renderer.autoRender();
renderer.playerControls = gameEngine.playerControls;
