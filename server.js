var express = require('express'),
    app = express(),
    PORT = 3000;
app.use(express.static('client-dist'));
app.get('/', function (req, res) {
  //res.send('<html><head></head><body><h1>This is a test</h1></body></html>');
  res.sendFile(__dirname + '/client/index.html');
});

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT);
});
