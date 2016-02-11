var terrainGen = require('./modules/terrainGen')(),
    renderer = require('./modules/renderer'),
    gameEngine = require('./modules/gameEngine');

//var world = terrainGen.genTerrain();
//console.dir(world);
var renderer = new renderer(terrainGen.genTerrain);

var gameEngine = new gameEngine(renderer.worldArray);







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
