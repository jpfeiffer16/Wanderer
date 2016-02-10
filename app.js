var terrainGen = require('./modules/terrainGen')(),
    renderer = require('./modules/renderer');

console.log(require('./modules/terrainGen'));
var world = terrainGen.genTerrain();
console.dir(world);
var renderer = new renderer(world);









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
