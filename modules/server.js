
    // app = express();
module.exports = function(port) {
  var express = require('express');
  var bodyparser = require('body-parser');
  var app = express();
  var server = require('http').Server(app);
  app.use(express.static('client-dist'));
  app.use(express.static('images'));
  //app.use(bodyparser.urlencoded({ extended: false }));
  //var parser = bodyparser.urlencoded({ extended: false });
  var multer  = require('multer')
  //var upload = multer({ dest: 'uploads/' });
  var storage = multer.memoryStorage();
  var upload = multer({ storage: storage });
  var path = __dirname.substring(0, __dirname.lastIndexOf('/'));
  app.get('/', function (req, res) {
    //res.send('<html><head></head><body><h1>This is a test</h1></body></html>');
    res.sendFile(path + '/client/index.html');
  });
  app.get('/load', function (req, res) {
    res.sendFile(path + '/client/load.html');
  });
  app.post('/load', upload.single('world'), function (req, res) {
    //console.log(req.file);
    if (req.file != undefined) {
      var json = req.file.buffer.toString('utf8');
      process.world.restoreFromJson(json);      
    }
    //console.log(json);
    res.sendFile(path + '/client/loaded.html');
  });

  server.listen(port, function () {
    console.log('Server listening on port ' + port);
  });
  return server;
}
