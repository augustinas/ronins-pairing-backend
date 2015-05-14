var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/maker_backend_test');
var UserModel = require('./app/models/maker.js');

app.listen(3000, function() {
  console.log('Listening on port 3000');
});

app.get('/', function(request, response) {
  response.status(200).send('Liversedge');
});

app.get('/makers', function(request, response) {
  UserModel.find({}, function(err, doc) {
    response.json({makers: doc});
  });

});