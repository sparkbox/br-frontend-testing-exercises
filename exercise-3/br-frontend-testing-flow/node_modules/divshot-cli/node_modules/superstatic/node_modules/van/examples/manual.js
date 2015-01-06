var Van = require('../lib');

var van = new Van();

van.addPassenger('ls van', {cwd: '..'});
van.addPassenger('ls examples');

van.run();