var notFound = require('../');
var connect = require('connect');
var request = require('supertest');
var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var mkdirp = require('mkdirp');
var rmdir = require('rmdir');
var Mocksy = require('mocksy');
var server = new Mocksy({port: 5432});

describe('not found middleware', function() {
  it('serves a custom 404 page', function (done) {
    fs.writeFileSync('error.html', 'error');
    
    var app = connect()
      .use(notFound(process.cwd() + '/error.html'));
    
    request(app)
      .get('/asdfasdf')
      .expect('error')
      .expect(404)
      .end(function (err) {
        fs.unlinkSync('error.html');
        
        if (err) throw err;
        done();
      });
  });
  
  it('serves a custom 404 page when the root is set to a sub-directory, relative to the root directory', function (done) {
    var rootDir = '.tmp';
    
    mkdirp.sync(rootDir);
    fs.writeFileSync(rootDir + '/error.html', 'error page');
    
    var app = connect()
      .use(notFound(path.join(process.cwd(), rootDir, 'error.html')));
    
    request(app)
      .get('/')
      .expect(404)
      .expect(function (data) {
        expect(data.res.statusCode).to.equal(404);
        expect(data.res.text).to.equal('error page');
      })
      .end(function (err) {
        rmdir(rootDir, function (errOnRemove) {
          done(err || errOnRemove);
        });
      });
  });
  
  it('skips the middleware if there is no filepath', function (done) {
    var app = connect()
      .use(notFound());
    
    request(app)
      .get('/')
      .expect(404)
      .end(done);
  });
  
  it('skips the middleware if the file is not found', function (done) {
    var app = connect()
      .use(notFound(__dirname + '/qwer.html'));
    
    request(app)
      .get('/')
      .expect(404)
      .end(done);
  });
  
  it('proxies a remote 404 page', function (done) {
    server.start(function (err) {
      var remoteErrorPageUrl = 'http://127.0.0.1:5432';
      var app = connect()
        .use(notFound(remoteErrorPageUrl));
      
      request(app)
        .get('/not-found')
        .expect(404)
        .expect(function (data) {
          var res = data.res.text;
          expect(res).to.equal('Not Found');
        })
        .end(function (err) {
          server.stop(function () {
            done(err);
          });
        });
      });
  });
  
  describe('overrides', function () {
    it('exists method', function (done) {
      fs.writeFileSync('error.html', 'error');
      
      var existsCalled = false;
      var app = connect()
        .use(notFound(process.cwd() + '/error.html', {
          exists: function () {
            existsCalled = true;
            return true
          }
        }));
      
      request(app)
        .get('/asdfasdf')
        .expect('error')
        .expect(404)
        .expect(function () {
          expect(existsCalled).to.equal(true);
        })
        .end(function (err) {
          fs.unlinkSync('error.html');
          done(err);
        });
    });
    
    it('fullPath method', function (done) {
      var fullPathCalled = false;
      fs.writeFileSync('error.html', 'error');
      
      var existsCalled = false;
      var app = connect()
        .use(notFound(process.cwd() + '/error.html', {
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
        .get('/asdfasdf')
        .expect(function () {
          expect(fullPathCalled).to.equal(true);
        })
        .end(function (err) {
          fs.unlinkSync('error.html');
          done(err);
        });
    });
  });

  it('default file in options', function (done) {
    fs.writeFileSync('error2.html', 'error');
    
    var app = connect()
      .use(notFound(process.cwd() + '/error.html', {
        _default: process.cwd() + '/error2.html'
      }));
    
    request(app)
      .get('/asdfasdf')
      .expect('error')
      .expect(404)
      .end(function (err) {
        fs.unlinkSync('error2.html');
        
        if (err) throw err;
        done();
      });
  });
});