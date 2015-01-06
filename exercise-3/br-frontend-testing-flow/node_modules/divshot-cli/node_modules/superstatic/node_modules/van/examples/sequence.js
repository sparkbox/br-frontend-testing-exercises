var Van = require('../lib');

var van = new Van({
  scripts: [
    'echo "Hello World"',
    'ls derp'
  ]
});

van.run();

process.on('SIGINT', function() {
  van.stop();
});