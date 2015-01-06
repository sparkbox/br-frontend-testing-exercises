var path = require('path');
var join = path.join;
var normalize = path.normalize;

module.exports = function (data) {
  
  if (typeof data === 'string') {
    return slash(data);
  }
  
  if (typeof data === 'number') {
    return slash(data+'');
  }
  
  if (typeof data === 'object') {
    return objectSlash(data, arguments[1] || {});
  }
  
  return data;
};

function slash (pathname) {
  
  return normalize(join('/', pathname));
}

function objectSlash (original, options) {
  
  var keyMutator = options.keyMutator || slash;
  var keys = Object.keys(original);
  var len = keys.length;
  var slashed = {};
  
  for(var i = 0; i < len; i += 1) {
    var originalKey = keys[i];
    var key = originalKey;
    
    // Ignore keys if set to false
    if (options.key !== false) {
      
      // No comparator
      if (!options.keyMatches) {
        key = keyMutator(originalKey);
      }
      
      // Use comparator to determin if slash should be added
      else if (options.keyMatches(key)) {
        key = keyMutator(originalKey);
      }
    }
    
    var value = original[originalKey];
    slashed[key] = (options.value === false)
      ? value 
      : (typeof value === 'string')
        ? slash(value)
        : value;
  }
  
  return slashed;
}