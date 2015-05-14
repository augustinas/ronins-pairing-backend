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
  var toSave = new Maker({
      name: 'Joe'
  });
  
  beforeEach(function(done) {
    
    toSave.save(function(err) {
      console.log(toSave);
      done();
    });
  });

  afterEach(function(done) {
    Maker.model.remove({}, function() {
      done();
    });
  });

  it('lists makers', function(done) {
    request.get('localhost:3000').end(function(err, res) {
      expect(res.body).to.contain({id: toSave._id, name: 'Joe'});
      done();
    });
  });
});