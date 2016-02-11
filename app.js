var terrainGen = require('./modules/terrainGen')(),
    Renderer = require('./modules/renderer'),
    GameEngine = require('./modules/gameEngine');

//var world = terrainGen.genTerrain();
//console.dir(world);
var renderer = new Renderer(terrainGen.genTerrain);
var gameEngine = new GameEngine(renderer.worldArray);

gameEngine.start();
renderer.autoRender();





//var blessed = require('blessed'),
//    program = blessed.program();
//
//program.key('q', function(ch, key) {
//  program.clear();
//  program.disableMouse();
//  program.showCursor();
//  program.normalBuffer();
//  process.exit(0);
//});
//program.alternateBuffer();
//program.enableMouse();
//program.hideCursor();
//program.clear();
