var path = require('path');
var join = path.join;
var url = require('fast-url-parser');
var deliver = require('deliver');
var fileExists = require('file-exists');
var mime = require('mime-types');

module.exports = function (options) {
  options = options || {};
  
  var root = options.root || './';
  var indexFile = options.index || 'index.html';
  
  if (options.exists) fileExists = options.exists;
  
  return function (req, res, next) {
    var originalPathname = url.parse(req.url).pathname;
    var rootPathname = join(root, originalPathname);
    var pathname = (isDirectoryIndex(originalPathname, indexFile))
      ? join(rootPathname, indexFile)
      : localPath(rootPathname);
    
    if (!pathname) return next();
    
    // Ensure correct mime type
    var contentType = mime.lookup(pathname);
    
    if (options.fullPath) {
      var p = options.fullPath(pathname);
      root = p.root;
      req.url = p.pathname;
    }
    
    deliver(req, res, {
      root: root,
      index: indexFile,
      contentType: contentType,
      headers: options.headers
    }).pipe(res);
  };
  
  function isDirectoryIndex (pathname, indexFile) {
    var p = join(root, pathname, indexFile);
    return fileExists(p);
  }
  
  function localPath (pathname) {
    return (fileExists(pathname)) ? pathname : undefined;
  }
};