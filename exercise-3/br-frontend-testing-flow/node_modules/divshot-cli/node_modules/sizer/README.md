# sizer
 
Filter files by size recursively
 
## Install
 
```
npm install sizer --save
```
 
## Usage
 
```js
var sizer = require('sizer');

sizer.bigger(1000, __dirname, function (err, files) {
  // files is a list of files bigger than 1000 bytes
});
```

## Api

### bigger(bytes, directory[, ignore], callback)

* `bytes` - size in bytes to compare the files to
* `directory` - the directory containing the files
* `ignore` - (OPTIONAL) an array of files to ignore (uses [minimatch](https://github.com/isaacs/minimatch) to compare)
* `callback` - gets called when call files have been compared

### smaller(bytes, directory[, ignore], callback)

* `bytes` - size in bytes to compare the files to
* `directory` - the directory containing the files
* `ignore` - (OPTIONAL) an array of files to ignore (uses [minimatch](https://github.com/isaacs/minimatch) to compare)
* `callback` - gets called when call files have been compared
 
## Run Tests
 
```
npm install
npm test
```