var express = require('express');

var app = express();

app.get('/', function(request, response) {
	response.send('Liversedge — European Capital of Culture 2016');
});

app.get('/joe', function(request, response) {
	response.sendFile('joe.html');
});

var server = app.listen(3000, function() {
	console.log('Listening on port 3000');
});