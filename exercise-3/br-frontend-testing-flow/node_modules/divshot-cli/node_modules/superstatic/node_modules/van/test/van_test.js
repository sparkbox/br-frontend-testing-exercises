var should = require('chai').should();
var Van = require('../lib');

describe('Van', function() {
  describe('constructor', function() {
    describe('with a scripts object', function() {
      var van = new Van({scripts: {foo: 'echo "foo"', bar: 'echo "bar"'}});
      
      it('should add as many passengers as there are values', function() {
        van.passengers.length.should.equal(2);
      });
      
      it('should set the prefix on the passengers', function() {
        van.passengers[0].options.prefix.should.equal('foo');
      });
    });
    
    describe('with a scripts array', function() {
      var van = new Van({scripts: ['echo "foo"', 'echo "bar"']});
      
      it('should add as many passengers as there are values', function() {
        van.passengers.length.should.equal(2);
      });
    });
  });
});