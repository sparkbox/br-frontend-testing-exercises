var Van = require('../lib');

var van = new Van({
  scripts: {
    foo: 'superstatic -p 4000',
    bar: 'superstatic -p 4001'
  }
});
van.start();

process.on('SIGINT', function() {
  van.stop();
});