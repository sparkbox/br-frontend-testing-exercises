# Shrub

Manipulate lists of files recursively in Node. Chainable API with a promise ending.

## Install

```
npm install shrub --save
```

## Usage

```js
var shrub = require('shrub');

shrub('path/to/dir')
  .each(function (filePath, stats, next) {
    // Do something here
    next();
  })
  .filter(function (filePath, stats, next) {
    // Works the same as Array.prototype.filter
    next(true);
  }).then(function (files) {
    // All done
  });
```

## Methods

### each(callback)

Asynchronous loop through file tree Returns an array. The ` next ` callback takes no arguments.

```js
shrub('path/to/dir').each(function (filePath, stats, next) {
  next();
}).then(function (files) {

});
```

### filter(callback)

Aynchronously filter the file tree. Returns an array. The ` next ` callback takes a truthy value and will filter similar to ` Array.prototype.filter `.

```js
shrub('path/to/dir').filter(function (filePath, stats, next) {
  var isValidSize = stats.size < 10000;
  next(isValidSize);
}).then(function (filteredFiles) {
  
});
```

### find(callback)

Asynchronously find a single item in the files true. Returns a single object. The ` next ` callback takes a truth value and will return the first item in the file list that is true.

```js
shrub('path/to/dir').find(function (filePath, stats, next) {
  var isFile = stats.name ='somefile.js';
  next(isFile);
}).then(function (file) {
  
});
```

### then(callback)

Promise-looking callback after all the manipulation methods have fun. Receives a ` files ` value as the only arguments (is a single object of a file if the last manipulation method is ` filter `).

```js
var s = shrub('path/to/dir')
  .each(function (filePath, stats, next) {
    // Do something here
    next();
  })
  .filter(function (filePath, stats, next) {
    next(stats.size < 1);
  });

// Then, somewhere else.
s.then(function (files) {
  // All done
});
```

## Run tests

```
npm install
npm test
```