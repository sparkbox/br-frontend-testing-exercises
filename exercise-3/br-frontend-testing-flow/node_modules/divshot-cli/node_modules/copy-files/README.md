# copy-files

Streaming file copier

## Install

```
npm install copy-files --save
```

## Usage

```js
var copy = require('copy-files');

copy({
  files: {
    'newname.txt': __dirname + '/path/to/source.txt'
  },
  dest: '/path/to/destination',
}, function (err) {
  // All copied!
});
```

### copy(options, callback)

Async copy method using streams to copy files

#### options

* `files` - list of files to copy. The key is the copied file's name and the value is the file to copy
* `dest` - the destination directory to copy the files to
* `overwrite` - OPTIONAL - flag telling the copy method whether or not to overwrite existing files in `dest` directory. Defaults to *false*.

## Run Tests

```
npm install
npm test
```
