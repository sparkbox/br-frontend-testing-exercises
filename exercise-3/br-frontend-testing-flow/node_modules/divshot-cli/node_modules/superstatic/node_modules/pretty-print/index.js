var _ = require('lodash');
var feedback = require('feedback');
var chalk = require('chalk');
var util = require('util');

var print = module.exports = function (data, options) {
  if (isBasicArray(data)) return printBasicArray(data, options);
  if (isArray(data)) return printArrayOfObjects(data, options);
  if (isObject(data)) return printObject(data, options);
};

function printObject (data, options) {
  options = options || {};

  var defaults = {
    leftPadding: 2,
    rightPadding: 2
  };
  
  _.defaults(options, defaults);
  
  var keys = _.keys(data);
  var maxKeyLen = _.max(_.map(keys, function (key) {
    return key.length;
  })) + options.rightPadding;
  
  _.each(keys, function (key) {
    var paddedKey = addPadding(key, maxKeyLen);
    var leftPadding = options.leftPadding;
    var lPad = '';
    
    while (leftPadding--) {
      lPad += ' ';
    }
    
    if (util.isArray(data[key]) && data[key].length > 0){
      var blankKey = key.replace(/./gi, ' '); // used for spacing
      var blankPaddedKey = addPadding(blankKey, maxKeyLen);
      var arr = data[key];
      
      feedback.info(lPad + paddedKey + JSON.stringify(arr[0]).replace(/^\"|\"$/g, ''));
      
      for(var i = 1; i < arr.length; i += 1) {
        feedback.info(lPad + blankPaddedKey + JSON.stringify(arr[i]).replace(/^\"|\"$/g, ''));
      }
    }
    else{
      feedback.info(lPad + paddedKey + JSON.stringify(data[key]).replace(/^\"|\"$/g, ''));
    }
  });
}

function printArrayOfObjects (data, options) {
  var defaults = {
    padding: 0,
    leftPadding: 2,
    rightPadding: 2
  };
  
  _.defaults(options, defaults);
  
  var maxKeyLen = _.max(_.map(data, function (obj) {
    return obj[options.key].length;
  })) + options.rightPadding;
  
  _.each(data, function (obj) {
    var objKey = obj[options.key];
    var leftPadding = options.leftPadding;
    var lPad = '';
    
    if (!objKey) return;
    
    while (leftPadding--) {
      lPad += ' ';
    }
    
    var paddedKey = lPad + addPadding(objKey, maxKeyLen);
    
    if (options.value) paddedKey += obj[options.value];
    feedback.info(paddedKey);
  });
}

function printBasicArray (data, options) {
  var defaults = {
    leftPadding: 2
  };
  
  var leftPadding = options.leftPadding;
  var lPad = '';
  
  while (leftPadding--) {
    lPad += ' ';
  }
  
  _.defaults(options, defaults);
  
  _.each(data, function (val) {
    feedback.info(lPad + val);
  });
};

function addPadding (key, maxPadding) {
  var padding = _.map(Array(maxPadding - key.length), function () { return ' '; });
  return key.split('').concat(padding).join('');
}

function isArrayOfObjects (data) {
  return _.isObject(data[0]) && !_.isArray(data[0]);
}

function isBasicArray (data) {
  return _.isArray(data) && !_.isObject(data[0]);
}

function isArray (data) {
  return _.isArray(data) && isArrayOfObjects(data);
}

function isObject(data) {
  return _.isObject(data) && !_.isArray(data);
}
