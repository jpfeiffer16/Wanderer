var fs = require('fs');

module.exports = (function() {
  function Logger() {
    this.log = function(value, callback) {
      var valueToAppend = '================ \n' + value + '\n'
      fs.appendFile('./log.txt', valueToAppend, function(err) {
        if (err) throw err;
        if (typeof callback == 'function') callback();
      });
    };
    fs.appendFile('./log.txt', '\n# Run: ' + Date.now().toString() + '\n', function(err) {
      if (err) throw err;
    });
  }
  return new Logger();
})();