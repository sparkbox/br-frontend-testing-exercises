var static = require('../');
var fs = require('fs');
var path = require('path');
var connect = require('connect');
var request = require('supertest');
var mkdirp = require('mkdirp');
var rmdir = require('rmdir');
var expect = require('chai').expect;

describe('broker', function() {
  afterEach(function (done) {
    if (fs.existsSync('.tmp')) rmdir('.tmp', done);
    else done();
  });
  
  it('servers a static file', function (done) {
    mkdirp.sync('.tmp');
    fs.writeFileSync('.tmp/test.html', 'test');
    
    var app = connect()
      .use(static());
    
    request(app)
      .get('/.tmp/test.html')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect('test')
      .end(done);
  });
  
  it('skips the middleware if the file does not exist', function (done) {
    var app = connect()
      .use(static({
        root: '.tmp'
      }));
    
    request(app) 
      .get('/test.html')
      .expect(404)
      .end(done);
  });
  
  it('serves the directory index file if it is a path to a directory', function (done) {
    mkdirp.sync('.tmp/public');
    fs.writeFileSync('.tmp/public/index.html', 'test');
    
    var app = connect()
      .use(static({
        root: '.tmp'
      }));
    
    request(app)
      .get('/public/')
      .expect(200)
      .expect('test')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .end(done);
  });
  
  it('serves a directory index file when the directory index file has a custom name', function (done) {
    mkdirp.sync('.tmp/public');
    fs.writeFileSync('.tmp/public/custom.html', 'test');
    
    var app = connect()
      .use(static({
        root: '.tmp',
        index: 'custom.html'
      }));
    
    request(app)
      .get('/public/')
      .expect(200)
      .expect('test')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .end(done);
  });
  
  it('overrides the file exists method with a custom method', function (done) {
    mkdirp.sync('.tmp');
    fs.writeFileSync('.tmp/test.html', 'test');
    
    var app = connect()
      .use(static({
        exists: function () {
          return false
        }
      }));
    
    request(app)
      .get('/.tmp/test.html')
      .expect(404)
      .end(done);
  });
  
  it('overrides the fullPath method', function (done) {
    var fullPathCalled = false;
    var app = connect()
      .use(static({
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
      .get('/')
      .expect(function () {
        expect(fullPathCalled).to.equal(true);
      })
      .end(done);
  });
});