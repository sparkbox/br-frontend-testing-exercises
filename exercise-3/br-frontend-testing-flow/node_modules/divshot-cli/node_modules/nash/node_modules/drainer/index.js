var asArray = require('as-array');

var drainer = function(queue) {
  return function () {
    var defaultArgs = asArray(arguments);
    var callback = defaultArgs.pop();
    
    drain(queue, [], callback, defaultArgs);
  };
};

var drain = function (queue, args, callback, defaultArgs) {
  var fn = queue.shift();
  args = args ? defaultArgs.concat(args) : defaultArgs;
  
  if (!fn) return callback.apply(callback, [null].concat(args));
  
  // Add the queue method callback to the args list
  args.push(function () {
    var passedArgs = [].slice.call(arguments);
    var err = passedArgs.shift();
    
    if (err) return callback(err);
    
    drain(queue, passedArgs, callback, defaultArgs);
  });
  
  // Call the queue method
  fn.apply(fn, args);
};

module.exports = drainer;