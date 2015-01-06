var each = require('lodash.foreach');
var slasher = require('glob-slasher');
var globject = require('globject');
var url = require('fast-url-parser');
var onHeaders = require('on-headers');

module.exports = function (headerPaths) {
  
  return function (req, res, next) {
    
    var pathname = url.parse(req.url).pathname;
    var headersConfig = globject(slasher(headerPaths));
    var headers = headersConfig(slasher(pathname)) || {};
    
    onHeaders(res, function () {
      
      each(headers, function (val, name) {
        
        res.setHeader(name, val);
      });
    });
    
    return next();
  };
};
