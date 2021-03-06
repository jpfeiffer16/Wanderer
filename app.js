#!/usr/bin/env node
var TerrainGen = require('./modules/terrainGen')(),
    Renderer = require('./modules/renderer'),
    Reactor = require('./modules/reactor'),
    GameEngine = require('./modules/gameEngine'),
    Loader = require('./modules/loader'),
    ServerManager = require('./modules/serverManager.js'),
    World = require('./types/world.js');
if (process.argv[2] == 's') {
  var ServerRenderer = require('./modules/serverRenderer');
  //NOTE: Temporarily out of service to get a release out the door.
  // ServerManager(function(newWorld, selection) {
  //   //var world = null;
  //   if (newWorld) 
  //     startGame(TerrainGen.genTerrain());
  //   else {
  //     //Loader.loadFile('./' + selection, function(data) {
  //     //  startGame(new World().restoreFromJson(data));
  //     //});
  //     var selectedWorld = new World();
  //     selectedWorld.restoreFromFile('./' + selection);
  //     startGame(selectedWorld);
  //   }
  // });
  //NOTE: Using this for now till we can get the ServerManager stable
  startGame(TerrainGen.genTerrain());                // <----------|
  function startGame(world) {
    process.world = world;
    var renderer = new ServerRenderer(world);
    var gameEngine = new GameEngine(world, false);
    gameEngine.start();
    renderer.autoRender();
    console.log('Server running');
  };
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
  var world = TerrainGen.genTerrain(true);
  var renderer = new Renderer(world);
  var gameEngine = new GameEngine(world, false);
  gameEngine.start();
  renderer.autoRender();
  renderer.playerControls = gameEngine.playerControls;
  renderer.utilities = gameEngine.utilities;
}
