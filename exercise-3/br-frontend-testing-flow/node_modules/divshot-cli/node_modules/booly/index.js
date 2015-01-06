var isNumber = require('is-number');

var exports = module.exports = function (val) {
  
  // Eqeual comparisons
  if (val === true) return true;
  if (val === 'true') return true;
  
  if (val === 0 ) return false;
  if (val === false) return false;
  if (val === 'false') return false;
  
  // Once it gets to this point, any string should
  // just get returned
  if (typeof val === 'string') return val;
  
  // Not equal comparisons
  if (isNumber(val)) return true;
};
