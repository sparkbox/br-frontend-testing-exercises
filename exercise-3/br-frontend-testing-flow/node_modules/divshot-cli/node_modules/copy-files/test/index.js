var copyFiles = require('../');
var fs = require('fs');
var expect = require('chai').expect;

describe('copy files', function () {
  
  beforeEach(function () {
    fs.writeFileSync(__dirname + '/test.txt', 'testing');
  });
  
  afterEach(function () {
    fs.unlinkSync(__dirname + '/test.txt');
  });
  
  it('copies files to a destination directory', function (done) {
    var filepath = __dirname + '/copied.txt';
    
    copyFiles({
      files: {
        'copied.txt': __dirname + '/test.txt'
      },
      dest: __dirname
    }, function (err) {
      expectFileExistsAndHasContents(filepath, 'testing');
      fs.unlinkSync(filepath);
      done();
    });
  });
  
  it('skips copying a file if the file already exists in the destination directory', function (done) {
    var filepath = __dirname + '/copied.txt';
    fs.writeFileSync(filepath, 'already exists');
    
    copyFiles({
      files: {
        'copied.txt': __dirname + '/test.txt'
      },
      dest: __dirname
    }, function (err) {
      expectFileExistsAndHasContents(filepath, 'already exists');
      fs.unlinkSync(filepath);
      done();
    });
  });
  
  it('overwrites a files in the destination directory', function (done) {
    var filepath = __dirname + '/copied.txt';
    fs.writeFileSync(filepath, 'already exists');
    
    copyFiles({
      files: {
        'copied.txt': __dirname + '/test.txt'
      },
      dest: __dirname,
      overwrite: true
    }, function (err) {
      expectFileExistsAndHasContents(filepath, 'testing');
      fs.unlinkSync(filepath);
      done();
    });
  });
  
});

function expectFileExistsAndHasContents (filepath, contents) {
  expect(fs.existsSync(filepath)).to.equal(true);
  expect(fs.readFileSync(filepath).toString()).to.equal(contents);
}