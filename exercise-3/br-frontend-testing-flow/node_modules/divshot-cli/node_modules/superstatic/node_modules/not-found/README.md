# not-found

Express/Connect middleware to serve a default not found/404 page.

## Install

```
npm install not-found --save
```

## Usage

Local file

```js
var express = require('express');
var notFound = require('not-found');

var app = express();

app.use(notFound(__dirname + '/not-found.html'));

app.listen(3000, function () {

});
```

Remote file

```js
var express = require('express');
var notFound = require('not-found');

var app = express();

app.use(notFound('http://domain.com/not-found.html'));

app.listen(3000, function () {

});
```

### notFound(file)

* `file` - the path to the local file or a url for a remote file. This is required. It will skip the middleware if it is not provided or the file does not exists

## Run Tests

```
npm install
npm test
```

