var request = require('superagent');
var expect = require('expect.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/maker_backend_test');
Maker = require('../app/models/maker');

describe('homepage', function(){

  it('mentions liversedge', function(done){
    request.get('localhost:3000').end(function(err, res){
      expect(res).to.exist;
      expect(res.status).to.equal(200);
      expect(res.text).to.contain('Liversedge');
      done();
    })
  });

  it('mentions joe', function(done){
    request.get('localhost:3000/joe').end(function(err, res){
      done();
    })
  });

});

describe('listing makers', function() {

  var testMaker;

  beforeEach(function(done) {

    Maker({name: 'Joe'}).save(function(err, doc) {
      testMaker = doc;
      done();
    });
  });

  afterEach(function(done) {
    Maker.remove({}, function() {
      done();
    });
  });

  it('lists makers', function(done) {
    request.get('localhost:3000/makers').end(function(err, res) {
      expect(res.body.makers[0].name).to.contain('Joe');
      expect(res.body.makers[0]._id).to.equal(testMaker.id);
      done();
    });
  });
});

describe('adding makers', function() {
  afterEach(function(done) {
    Maker.remove({}, function() {
      done();
    });
  });

  it('adds a maker', function(done) {
    request.post('localhost:3000/makers').send({name: 'Joe'}).end(function(err, res) {
      Maker.find({}, function(error, doc) {
        expect(doc[0].name).to.equal('Joe');
        expect(res.body.name).to.equal('Joe');
        done();
      });
    });
  });
});

describe('creating "session"', function(){

  var testMaker;

  beforeEach(function(done) {

    Maker({name: 'Joe'}).save(function(err, doc) {
      testMaker = doc;
      done();
    });
  });

  afterEach(function(done) {
    Maker.remove({}, function() {
      done();
    });
  });

  it('returns maker object if valid name given', function(done){
    request.get('localhost:3000/makers/session/Joe').end(function(err, res) {
      expect(res.body.name).to.equal('Joe');
      expect(res.body._id).to.equal(testMaker.id);
      done();
    });
  });

});


