var router = require('../');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var rmdir = require('rmdir');
var connect = require('connect');
var request = require('supertest');
var expect = require('chai').expect;

describe('custom route middleware', function() {
  
  afterEach(function (done) {
    
    if (fs.existsSync('.tmp')) rmdir('.tmp', done);
    else done()
  });
  
  it('serves the mapped route file for a custom route', function (done) {
    
    mkdirp.sync('.tmp');
    fs.writeFileSync('.tmp/index.html', 'test', 'utf8');
    
    var app = connect()
      .use(router({
        '/test1': '/index.html'
      }, {
        root: '.tmp'
      }));
    
    request(app)
      .get('/test1')
      .expect(200)
      .expect('test')
      .end(done);
  });
  
  it('serves the index file of a directory if mapped route is mapped to a directory', function (done) {
    
    mkdirp.sync('.tmp/test/dir');
    fs.writeFileSync('.tmp/test/dir/index.html', 'test', 'utf8');
    
    var app = connect()
      .use(router({
        '/test3': '.tmp/test/dir'
      }));
    
    request(app)
      .get('/test3')
      .expect(200)
      .expect('test')
      .end(done);
  });
  
  it('serves the mapped route file for a custom route with a declared root', function (done) {
    
    mkdirp.sync('.tmp/public');
    fs.writeFileSync('.tmp/public/index.html', 'test', 'utf8');
    
    var app = connect()
      .use(router({
        '/test1': '/index.html'
      }, {
        root: '.tmp/public'
      }));
    
    request(app)
      .get('/test1')
      .expect(200)
      .expect('test')
      .end(done);
  });
  
  it('skips the middleware if there is no custom route', function (done) {
    
    var app = connect()
      .use(router());
    
    request(app)
      .get('/no-route')
      .expect(404)
      .end(done);
  });
  
  it('skips the middleware if the custom route is for a file that does not exist', function (done) {
    
    var app = connect()
      .use(router({
        '/test1': '/index.html'
      }));
    
    request(app)
      .get('/test1')
      .expect(404)
      .end(done);
  });
  
  describe('glob matching', function() {
    
    it('maps all paths to the same pathname', function (done) {
      
      mkdirp.sync('.tmp');
      fs.writeFileSync('.tmp/index.html', 'test', 'utf8');
      
      var app = connect()
        .use(router({
          '**': '/index.html'
        }, {
          root: '.tmp'
        }));
      
      request(app)
        .get('/any-route')
        .expect(200)
        .expect('test')
        .end(done);
    });
    
    it('maps all requests to files in a given directory to the same pathname', function (done) {
      
      mkdirp.sync('.tmp/subdir');
      fs.writeFileSync('.tmp/index.html', 'test', 'utf8');
      
      var app = connect()
        .use(router({
          '/subdir/**': '/index.html'
        }, {
          root: '.tmp'
        }));
      
      request(app)
        .get('/subdir/anything/here')
        .expect(200)
        .expect('test')
        .end(done);
    });
    
    it('routes requests that do not match a glob to a given file', function (done) {
    
      mkdirp.sync('.tmp/subdir');
      fs.writeFileSync('.tmp/index.html', 'test', 'utf8');
      
      var app = connect()
        .use(router({
          '!subdir/**': '/index.html'
        }, {
          root: '.tmp'
        }));
      
      request(app)
        .get('/not-subdir/anything/here')
        .expect(200)
        // .expect('test')
        .end(done);
    });
    
    it('overrides the exists method', function (done) {
      
      var existsCalled = false;
      var app = connect()
        .use(router({
          '/test': '/index.html'
        }, {
          exists: function () {
            existsCalled = true;
            return false;
          }
        }));
      
      request(app)
        .get('/test')
        .expect(function () {
          
          expect(existsCalled).to.equal(true);
        })
        .end(done);
    });
    
    it('overrides the fullPath method', function (done) {
      
      var fullPathCalled = false;
      var app = connect()
        .use(router({
          '/route': '/index.html'
        }, {
          exists: function () {
            
            return true;
          },
          fullPath: function (pathname) {
            
            fullPathCalled = true;
            return {
              root: '/',
              pathname: pathname
            }
          }
        }));
      
      request(app)
        .get('/route')
        .expect(function () {
          
          expect(fullPathCalled).to.equal(true);
        })
        .end(done);
    });
  });
});