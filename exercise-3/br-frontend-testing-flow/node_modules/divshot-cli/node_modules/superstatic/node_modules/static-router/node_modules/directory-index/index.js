var path = require('path');
var slash = require('slasher');

module.exports = function (filepath, indexFilename, extension) {
  indexFilename = indexFilename || 'index.html';
  
  // Serve the index file of a directory
  if (filepath && path.extname(filepath) !== (extension || '.html')) {
    filepath = path.join(slash(filepath), indexFilename);
  }
  
  return filepath;
}