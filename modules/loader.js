var fs = require('fs');
var Loader = function() {
  this.loadFile = function(path, callback) {
    fs.readFile(path,'utf8', function (err, data) {
      if (err) throw err;
      callback(data);
    }); 
  };
  this.saveFile = function(path, callback) {
    fs.writeFile(path, 'utf8', function(err, data) {
       if (err) throw err;
       callback(data);
    });
  };
};



module.exports = new Loader();


