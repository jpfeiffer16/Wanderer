var terrainGen = require('./modules/terrainGen')(),
    Renderer = require('./modules/renderer'),
    GameEngine = require('./modules/gameEngine');

var renderer = new Renderer(terrainGen.genTerrain);
//console.dir(renderer.worldArray);
var gameEngine = new GameEngine(renderer.worldArray);

gameEngine.start();
renderer.autoRender();
renderer.playerControls = gameEngine.playerControls;
