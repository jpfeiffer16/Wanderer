module.exports = function(callback) {
  var Loader = require('./loader'),
      blessed = require('blessed'),
      //program = blessed.program(),
      screen = blessed.screen();
  //program.clear();
  //program.alternateBuffer();
  screen.key(['C-c'], function() {
    return process.exit(0);
  });
  Loader.getListOffWorlds('./', function(list) {
    var simpleList = ['New World'];   
    for (var i = 0; i < list.length; i++) {
      var thisItem = list[i];
      var lastSlash = thisItem.lastIndexOf('/');
      simpleList.push(thisItem.substring(lastSlash, thisItem.length));
    }
    var list = blessed.list({
      top: 'center',
      left: 'center',
      width: '50%',
      height: '50%',
      style: {
        fg: 'white',
        bg: 'magenta',
        border: {
          fg: '#ffffff'
        }
      },
      keys: true,
      vi: true,
      items: simpleList 
    });
    screen.append(list);
    list.on('select', function(element, selection) {
      var newWorld = simpleList[selection] == 'New World';
      screen.destroy();
      if (typeof callback == 'function') callback(newWorld, simpleList[selection]); 
    });
    list.focus();
    screen.render();
    //setInterval(function() {
    //  screen.render();
    //}, 300);
  });
};
