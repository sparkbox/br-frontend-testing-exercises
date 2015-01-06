# slashify

Express/Connect middleware to handle trailing slashes with options.

**Why?**

Why another *remove trailing slash* middleware? Because we wanted options. Like leaving the slash when serving the index file of a directory and custom index file names, etc!

## Install

```
npm install slashify --save
```

## Usage

```js
var express = require('express');
var slashify = require('slashify');

var app = express();

app.use(slashify());

app.listen(3000, function () {
  
});
```

### slashify([options])

* `options`
  * `root` - the root directory. This is mostly used when you have a directory handling turned on and/or have custom index file names. Defaults to `./`
  * `index` - the name of the directory index file. Defaults to `index.html`.
  * `directory` - set whether or not you want slashify to leave the trailing slash when serving the index file of a directory. Defaults to `true`. Set to `false` to remove the trailing slash for all paths.


## Run Tests

```
npm install
npm test
```