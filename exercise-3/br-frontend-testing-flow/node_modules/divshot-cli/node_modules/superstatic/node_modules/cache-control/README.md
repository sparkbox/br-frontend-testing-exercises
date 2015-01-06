# cache-control

Express/Connect middleware to set url cache options with globs

## Install

```
npm install cache-control --save
```

## Usage

```js
var express = require('express');
var cache = require('cache-control');

var app = express();

app.use(cache({
  '/index.html': 1000,
  '/none/**/*.html': false,
  '/private.html': 'private, max-age=300',
  '/**': 500 // Default to caching all items for 500
}));

app.listen(3000, function () {
  
})
```

### cache(options)

* `options` - an object contain globs as the keys and caching declarations as the values

## Run Tests

```
npm install
npm test
```
