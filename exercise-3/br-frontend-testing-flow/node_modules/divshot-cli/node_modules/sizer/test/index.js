var path = require('path');
var sizer = require('../index.js');
var test = require('tape');
var ONE_KB = 1000;
var dir = path.resolve(__dirname, 'mock');

test('filters files bigger than a value', function (t) {
  sizer.bigger(ONE_KB, dir, [], function (err, files) {
    t.deepEqual(files, ['test/mock/4kb.js'], 'returns array of files')
    t.end();
  });
});

test('filters files smaller than than a value', function (t) {
  sizer.smaller(ONE_KB, dir, [], function (err, files) {
    t.deepEqual(files, ['test/mock/600b.js'], 'returns array of files')
    t.end();
  });
});

test('options are optional', function (t) {
  sizer.bigger(ONE_KB, dir, function (err, files) {
    t.deepEqual(files, ['test/mock/4kb.js'], 'returns array of files')
    t.end();
  });
});

test('ignores files', function (t) {
  sizer.bigger(ONE_KB, dir, ['**/4kb.js'], function (err, files) {
    t.deepEqual(files, [], 'returns array of files')
    t.end();
  });
});