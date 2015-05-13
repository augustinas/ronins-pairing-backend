var express = require('express');
var app = express();

app.listen(3000, function() {
  console.log('Listening on port 3000');
});

app.get('/', function(request, response) {
  response.status(200).send('Liversedge');
});

app.get('/joe', function(request, response) {
  response.sendFile('/joe.html', {root: 'public'});
});
