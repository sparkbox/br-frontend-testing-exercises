# static-router

Express/Connect middleware to server static files based on glob-like routes.

## Install

```
npm install static-router --save
```

## Usage

```js
var http = require('http');
var connect = require('connect');
var router = require('static-router');

var app = connect();

app.use(router({
  '/some-route': '/some-file.html',
  '**': '/index.html'
}));

http.createServer(app).listen(3000, function () {
  
});
```

### router(routes[, options])

* `routes` - object containing globs as keys and target static files and values
* `options`
  * `root` - the root directory of the static files
  * `index` - name of the default directory index file. Defaults to `index.html`

## Run Tests

```
npm install
npm test
```
