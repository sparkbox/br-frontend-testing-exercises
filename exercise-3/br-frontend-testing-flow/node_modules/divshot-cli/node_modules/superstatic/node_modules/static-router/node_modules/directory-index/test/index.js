var index = require('../');
var test = require('tape');

test('converts a directory path to a directory index path', function (t) {
  t.equals(index('/dir', 'home.html'), '/dir/home.html', '/dir to /dir/home.html');
  t.equals(index('/dir'), '/dir/index.html', 'defaults to index.html');
  t.end();
});

test('tests against specified extension', function (t) {
  t.equals(index('/dir/hey.png', 'index.html', '.png'), '/dir/hey.png', 'extension matches, so it returns given file path');
  t.equals(index('/dir/hey', 'index.html', '.png'), '/dir/hey/index.html', 'converts to directory index');
  t.end();
});
