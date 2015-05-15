var request = require('superagent');
var expect = require('expect.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/maker_backend_test');
Maker = require('../app/models/maker');
Pair = require('../app/models/pair')

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

// describe('retrieving makers', function() {

//   var testMaker;

//   beforeEach(function(done) {

//     Maker({name: 'Joe'}).save(function(err, doc) {
//       testMaker = doc;
//       done();
//     });
//   });

//   afterEach(function(done) {
//     Maker.remove({}, function() {
//       done();
//     });
//   });

//   it('returns a maker when given an ID', function(done) {
//     request.get('localhost:3000/makers/' + testMaker.id).end(function(err, res) {
//       expect(res.body.name).to.contain('Joe');
//       expect(res.body._id).to.equal(testMaker.id);
//       expect(res.body.pairedWith).to.equal([]);
//       expect(res.body.notPairedWith).to.equal([]);
//       done();
//     });
//   });
// });

describe('Pair Management', function() {

  var testMaker1, testMaker2;

  beforeEach(function(done) {

    Maker.create({name: 'Joe'}, function(err, doc) {
      testMaker1 = doc;
    });
    Maker.create({name: 'Mark'}, function(err, doc) {
      testMaker2 = doc;
      done();
    });
  });


  afterEach(function(done) {
    Pair.remove({}, function() {
    });
    Maker.remove({}, function() {
      done();
    });
  });

  it('can add a pair', function(done) {
    request.post('localhost:3000/pairs').send({pairPartner1: testMaker1.id , pairPartner2: testMaker2.id}).end(function(err, res) {
      Pair.find({}, function(error, docs) {
        expect(docs.length).to.equal(1);
      });
      expect(res.body.pairPartner1._id).to.equal(testMaker1.id);
      expect(res.body.pairPartner1.name).to.equal(testMaker1.name);
      expect(res.body.pairPartner2._id).to.equal(testMaker2.id);
      expect(res.body.pairPartner2.name).to.equal(testMaker2.name);
      done();
    });
  });

  it('lists pairs', function(done) {
    request.post('localhost:3000/pairs').send({pairPartner1: testMaker1.id , pairPartner2: testMaker2.id}).end(function(err, res) {
        request.get('localhost:3000/pairs').end(function(err, res) {
        expect(res.body.pairs[0].pairPartner1.name).to.contain('Joe');
        expect(res.body.pairs[0].pairPartner2.name).to.contain('Mark');
        expect(res.body.pairs[0].pairPartner1._id).to.equal(testMaker1.id);
        expect(res.body.pairs[0].pairPartner2._id).to.equal(testMaker2.id);
        expect(res.body.pairs.length).to.equal(1);
        done();
      });
    });
  });
});

