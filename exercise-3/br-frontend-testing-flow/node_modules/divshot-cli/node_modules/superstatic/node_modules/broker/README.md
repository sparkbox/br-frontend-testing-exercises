# broker

Express/Connect middleware that serves local or remote static files. 

## Install

```
npm install broker --save
```

## Usage

Serve static files

```js
var express = require('express');
var broker = require('broker');

var app = express();

app.use(broker({
  root: '/public'
}));

app.listen(3000, function () {

});
```

Proxy remote files

```js
var express = require('express');
var broker = require('broker');

var app = express();

app.use(broker({
  root: 'http://proxyserver.com'
}));

app.listen(3000, function () {

});
```

### broker([options])

* **options** - the options are similar to the [send module](https://github.com/visionmedia/send#options) because it uses this to serve local static files. Here are a few:
  * `root` - the root directory if serving local files or the url to prepend to requests to proxy remote static files
  * `index` - a string or array of strings that define the directory index file
  * `dotfiles` - how to handle files that begin with a dot. These are usually hidden files. The default value is ignore. Available options:
    * `allow` - No special treatment for dotfiles
    * `deny` - Send a 403 for any request for a dotfile
    * `ignore` - Pretend like the dotfile does not exist and 404
  



## Run Tests

```
npm install
npm test
```
