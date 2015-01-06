# directory-index

Convert directory url path to it's index file path

## Install

```
npm install directory-index --save
```

## Usage

```js
var index = require('directory-index');

console.log(index('/some-dir')) // OUTPUTS: /some-dir/index.html'
```

### Options

#### index(path [, indexFile, extension])

* `path` - the path the convert (or not)
* `indexFile` - the name of the index file. Defaults to `index.html`
* `extension` - the extension to compare path to. Defaults to `.html`

## Run Tests

```
npm install
npm test`
```
