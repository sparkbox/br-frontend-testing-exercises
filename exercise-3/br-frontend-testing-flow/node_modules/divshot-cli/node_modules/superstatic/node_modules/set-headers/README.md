# set-headers

Express/Connect middleware to set response headers based on globs

## Install

```
npm install set-headers --save
```

## Usage

```js
var express = require('express');
var setHeaders = require('set-headers');

var app = express();

app.use(setHeaders({
  '/some/path/**/*.json': {
    'Content-Type': 'application/json'
  }
}));

app.listen(3000, function () {
  
});
```

## Run Tests

```
npm install
npm test
```
