var url = require('fast-url-parser');
var regular = require('regular');
var onHeaders = require('on-headers');
var _isNumber = require('lodash.isnumber');
var globject = require('globject');
var slasher = require('glob-slasher');

module.exports = function (cachePaths) {
  
  cachePaths = cachePaths || {};
  
  return function (req, res, next) {
    
    var pathname = url.parse(req.url).pathname;
    var cacheValues = globject(slasher(cachePaths, {value: false}));
    var cacheValue = cacheValues(slasher(pathname));
    
    onHeaders(res, function () {
      
      res.setHeader('Cache-Control', 'public, max-age=300');
      
      if (cacheValue === false) {
        res.setHeader('Cache-Control', 'no-cache');
      }
      else if (isNumber(cacheValue)) {
        res.setHeader('Cache-Control', 'public, max-age=' + cacheValue.toString());
      }
      else if (typeof cacheValue === 'string') {
        res.setHeader('Cache-Control', cacheValue);
      }
    });
    
    next();
  };
};

function isNumber (val) {
  
  return _isNumber(val) || regular.number.test(val);
}