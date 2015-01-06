var Van = require('../lib');

module.exports = new Van({
  scripts: {
    foo: 'superstatic -p 4000',
    bar: 'superstatic -p 4001'
  }
});