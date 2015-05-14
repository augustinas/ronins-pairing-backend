var request = require('superagent');
var expect = require('expect.js');
var mongoose = require('mongoose');
maker = require('../lib/makers');
mongoose.connect('mongodb://localhost/maker_backend_test');

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
  beforeEach(function(done) {
    maker.register('Joe', function(doc) {
      firstMaker = doc;
      done();
    });
  });

  afterEach(function(done) {
    maker.model.remove({}, function() {
      done();
    });
  });

  it('lists makers', function(done) {
    request.get('localhost:3000').end(function(err, res) {
      expect(res.body).to.contain({id: 1, name: 'Joe'});
      done();
    });
  });
});