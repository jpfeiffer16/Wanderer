var fs = require('fs'),
    uuid = require('node-uuid');

module.exports = (function() {
  function Logger() {
    this.identifier = uuid.v4();
    this.log = function(value, callback) {
      var valueToAppend = '================ \n' + value + '\n'
      fs.appendFile('./log.txt', valueToAppend, function(err) {
        if (err) throw err;
        if (typeof callback == 'function') callback();
      });
    };
    var now = new Date();
    fs.appendFile('./log.txt', '\n# Run: ' + now.toLocaleDateString() + ", " + now.toLocaleTimeString() + '\n', function(err) {
      if (err) throw err;
    });
  }
  return new Logger();
})();