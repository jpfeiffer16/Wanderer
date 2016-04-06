var fs = require('fs');
var Loader = function() {
  this.loadFile = function(path, callback) {
    fs.readFile(path,'utf8', function (err, data) {
      if (err) throw err;
      callback(data);
    }); 
  };
  this.saveFile = function(path, data, callback) {
    fs.writeFile(path, data, 'utf8', function(err, data) {
      if (err) throw err;
      callback(data);
    });
  };
  this.getListOffWorlds = function(path, callback) {
    fs.readdir(path, function(err, files) {
      if (err) throw err;
      var finalList = [];
      for (var i = 0; i < files.length; i++) 
        if (files[i].indexOf('.wld') != -1) finalList.push(files[i]); 
      if (typeof callback == 'function') callback(finalList);
    });
  };
};

module.exports = new Loader();
