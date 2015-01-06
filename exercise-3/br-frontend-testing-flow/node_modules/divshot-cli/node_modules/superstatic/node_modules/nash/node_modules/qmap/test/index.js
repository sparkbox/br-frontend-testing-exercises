var Qmap = require('../index.js');
var expect = require('expect.js');

describe('adding methods for the queue', function () {
  var queue;
  
  beforeEach(function () {
    queue = new Qmap();
  });
  
  it('adds a method to be queue later', function () {
    queue.method('method1', function () {});
    expect(queue._methods.method1.toString()).to.eql(function () {}.toString());
  });
});


describe('adding functions to the queue', function () {
  var queue;
  
  beforeEach(function () {
    queue = new Qmap();
  });
  
  it('adds items to the queue', function () {
    queue.push(function () {});
    expect(queue._items.length).to.equal(1);
  });
  
  it('adds multiple items to the queue', function () {
    queue.push(function () {}, function () {});
    expect(queue._items.length).to.equal(2);
  });
  
  it('adds an array of functions to the queue', function () {
    queue.push([function () {}, function () {}]);
    expect(queue._items.length).to.equal(2);
  });
  
  it('adds a method to queue by name', function () {
    queue.method('method1', function () {});
    queue.push('method1');
    queue.push(function () {});
    expect(queue._items.length).to.equal(2);
    expect(queue._items[0]).to.be.a('function');
  });
  
  it('adds a functions arguments variable to the queue as an array of functions', function (done) {
    var called1 = false;
    var called2 = false;
    
    add(function(done) {
      called1 = true;
      done();
    }, function (done) {
      called2 = true;
      done()
    });
    
    queue.drain(function () {
      expect(called1).to.equal(true);
      expect(called2).to.equal(true);
      done();
    });
    
    function add () {
      queue.push(arguments);
    }
  });
});

describe('draining the queue', function () {
  var queue;
  
  beforeEach(function () {
    queue = new Qmap();
  });
  
  it('drains an empty queue', function (done) {
    queue.drain(function () {
      done();
    });
  });
  
  it('drains the queue of function only items', function (done) {
    var called = false;
    queue.push(function (done) {
      called = true;
      done();
    });
    
    queue.drain(function () {
      expect(called).to.equal(true);
      done();
    });
  });
  
  it('drains the queue of functions and named methods', function (done) {
    var called1 = false;
    var called2 = false;
    
    queue.method('method1', function (done) {
      called2 = true;
      done();
    });
    queue.push(function (done) {
      called1 = true;
      done();
    });
    queue.push('method1');
    
    queue.drain(function () {
      expect(called1).to.equal(true);
      expect(called2).to.equal(true);
      done();
    });
  });
  
  it('drains the queue as first in first out', function (done) {
    var calls = [];
    
    queue.method('method1', function (done) {
      calls.push(2);
      done();
    });
    queue.push(function (done) {
      calls.push(1);
      done();
    });
    queue.push('method1');
    
    queue.drain(function () {
      expect(calls[0]).to.equal(1);
      expect(calls[1]).to.equal(2);
      done();
    });
  });
  
  it('passes arguments into each item as the queue drains', function (done) {
    var called1 = false;
    var called2 = false;
    
    queue.push(function (arg1, done) {
      called1 = true;
      expect(arg1).to.equal('arg1');
      done();
    });
    queue.push(function (arg1, done) {
      called2 = true;
      expect(arg1).to.equal('arg1');
      done();
    });
    
    queue.drain('arg1', function () {
      expect(called1).to.equal(true);
      expect(called2).to.equal(true);
      done();
    });
  });
  
  it('exits early when an error is recieved', function (done) {
    var called1 = false;
    var called2 = false;
    
    queue.push(function (arg1, done) {
      called1 = true;
      expect(arg1).to.equal('arg1');
      done('error');
    });
    queue.push(function (arg1, done) {
      called2 = true;
      expect(arg1).to.equal('arg1');
      done();
    });
    
    queue.drain('arg1', function (err) {
      expect(err).to.equal('error');
      expect(called1).to.equal(true);
      expect(called2).to.equal(false);
      done();
    });
  });
  
  it('drains the queue with no callback', function () {
    queue.push(function (done) {
      done();
    });    
    
    queue.drain();
  });
  
  it('binds a context to each function in the queue', function (done) {
    var ctx = {name: 'name'};
    var queue = new Qmap(ctx);
    
    queue.push(function (done) {
      expect(this.name).to.equal('name');
      done();
    });
    
    queue.drain(done);
  });
});