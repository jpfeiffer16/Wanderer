
    // app = express();
module.exports = function(port) {
  var express = require('express');
  var app = express();
  var server = require('http').Server(app);
  app.use(express.static('client-dist'));
  app.use(express.static('images'));
  app.get('/', function (req, res) {
    //res.send('<html><head></head><body><h1>This is a test</h1></body></html>');
    var path = __dirname.substring(0, __dirname.lastIndexOf('/'));
    res.sendFile(path + '/client/index.html');
  });

  server.listen(port, function () {
    console.log('Server listening on port ' + port);
  });
  return server;
}
