var slashify = require('../');
var connect = require('connect');
var expect = require('chai').expect;
var request = require('supertest');
var query = require('connect-query');
var fs = require('fs-extra');

describe.only('remove trailing slash middleware', function() {
  it('removes the trailing slash for a given url', function (done) {
    var app = connect()
      .use(slashify());
    
    request(app)
      .get('/about/')
      .expect(301)
      .expect('Location', '/about')
      .end(done);
  });
  
  it('does not redirect the root url because of the trailing slash', function (done) {
    var app = connect()
      .use(slashify());
    
    request(app)
      .get('/')
      .expect(404)
      .end(done);
  });
  
  it('does not redirect for directory index files', function (done) {
    fs.mkdirpSync('.tmp/about');
    fs.writeFileSync('.tmp/about/index.html', 'index');
    
    var app = connect()
      .use(slashify({
        root: '.tmp'
      }));
    
    request(app)
      .get('/about/')
      .expect(404)
      .expect(function (data) {
        expect(data.req.path).to.equal('/about/');
      })
      .end(function (err) {
        fs.removeSync('.tmp');
        done(err);
      });
  });
  
  it('handles custom directory index file names', function (done) {
    fs.mkdirpSync('.tmp/about');
    fs.writeFileSync('.tmp/about/custom.html', 'index');
    
    var app = connect()
      .use(slashify({
        root: '.tmp',
        index: 'custom.html'
      }));
    
    request(app)
      .get('/about/')
      .expect(404)
      .expect(function (data) {
        expect(data.req.path).to.equal('/about/');
      })
      .end(function (err) {
        fs.removeSync('.tmp');
        done(err);
      });
  });
  
  it('ignores the directory index rule', function (done) {
    fs.mkdirpSync('.tmp/about');
    fs.writeFileSync('.tmp/about/index.html', 'index');
    
    var app = connect()
      .use(slashify({
        root: '.tmp',
        directory: false
      }));
    
    request(app)
      .get('/about/')
      .expect(301)
      .expect('Location', '/about')
      .end(function (err) {
        fs.removeSync('.tmp');
        done(err);
      });
  });
  
  it('redirects directory index to have a trailing slash', function (done) {
    fs.mkdirpSync('.tmp/about');
    fs.writeFileSync('.tmp/about/index.html', 'index');
    
    var app = connect()
      .use(slashify({
        root: '.tmp'
      }));
    
    request(app)
      .get('/about')
      .expect(function (req) {
        expect(req.headers.location).to.equal('/about/');
      })
      .expect(301)
      .end(function (err) {
        fs.removeSync('.tmp');
        done(err);
      });
  });
  
  it('preserves the query parameters on redirect', function (done) {
    var app = connect()
      .use(query())
      .use(slashify());
    
    request(app)
      .get('/contact/?query=param')
      .expect(301)
      .expect('Location', '/contact?query=param')
      .end(done);
  });
  
  it('overrides the file exists method with a custom method', function (done) {
      fs.mkdirpSync('.tmp');
      fs.writeFileSync('.tmp/test.html', 'test');
      
      var app = connect()
        .use(slashify({
          exists: function () {
            return false
          }
        }));
      
      request(app)
        .get('/.tmp/test.html')
        .expect(404)
        .end(function (err) {
          fs.removeSync('.tmp');
          done(err);
        });
    });
});