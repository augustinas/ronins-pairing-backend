var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/maker_backend_test');
var UserModel = require('./app/models/maker.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

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

app.post('/makers', function(request, response) {
  UserModel.create(request.body, function(err, doc) {
    response.json(doc);
  });
});

app.get('/makers/session/:name', function(request, response) {
  UserModel.find({name: request.params.name}, function(err, doc) {
    response.json(doc[0]);
  });
});

app.get('/makers/:id', function(request, response) {
  UserModel.find({_id: request.params.id}, function(err, doc) {
    something = JSON.parse(JSON.stringify(doc[0]));
    something.pairedWith = [];
    something.notPairedWith = [];
    console.log(something);
    response.json(something);
  });
});