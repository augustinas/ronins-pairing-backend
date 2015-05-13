var request = require('superagent');
var expect = require('expect.js');

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
      console.log(res);
      done();
    })
  });

});