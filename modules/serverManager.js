module.exports = function(callback) {
  var Loader = require('./loader'),
      blessed = require('blessed'),
      program = blessed.program(),
      screen = blessed.screen();
  // program.clear();
  // program.alternateBuffer();
  screen.key(['q'], function() {
    return process.exit(0);
  });
  process.on('SIGINT', function() {
    console.log('Got SIGINT');
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
      width: '70%',
      height: '70%',
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
      if (newWorld) {
        var form = blessed.form({
          parent: screen,
          keys: true,
          left: 'center',
          top: 'center',
          width: 30,
          height: 6,
          bg: 'green',
          content: 'Enter new world name'
        });
        
        var worldInput = blessed.textbox({
          parent: form,
          top: 2,
          left: 'center',
          width: '50%',
          height: 1,
          mouse: true,
          keys: true,
          shrink: true,
          inputOnFocus: true,
          name: 'worldInput',
          style: {
            fg: 'white',
            bg: 'magenta',
            border: {
              fg: '#ffffff'
            }
          }
        });
        
        var submit = blessed.button({
          parent: form,
          mouse: true,
          keys: true,
          shrink: true,
          padding: {
            left: 1,
            right: 1
          },
          left: 3,
          bottom: 1,
          name: 'submit',
          content: 'submit',
          style: {
            bg: 'blue',
            focus: {
              bg: 'red'
            },
            hover: {
              bg: 'red'
            }
          }
        });

        var cancel = blessed.button({
          parent: form,
          mouse: true,
          keys: true,
          shrink: true,
          padding: {
            left: 1,
            right: 1
          },
          right:3,
          bottom: 1,
          name: 'cancel',
          content: 'cancel',
          style: {
            bg: 'blue',
            focus: {
              bg: 'red'
            },
            hover: {
              bg: 'red'
            }
          }
        });

        submit.on('press', function() {
          form.submit();
        });
        
        worldInput.focus();

        cancel.on('press', function() {
          form.reset();
          form.destroy();
          list.focus();
        });

        form.on('submit', function(data) {
          form.setContent('Submitted.');
          screen.render();
        });

        form.on('reset', function(data) {
          form.setContent('Canceled.');
          screen.render();
        });
        screen.render();
      }

      if (typeof callback == 'function' && !newWorld) {
        screen.destroy();
        // program.normalBuffer();
        callback(false, simpleList[selection]);
      }
    });
    list.focus();
    screen.render();
  });
};
