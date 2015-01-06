pretty-print
============

Print formatted data to the the command line.

## Install

```
npm install pretty-print --save
```

## Usage

###Object

**Options**

* ` leftPadding ` - extra padding before the object key. Defaults to 2.
* ` rightPadding ` - extra padding after the object key. Defaults to 2.

```javascript
var print = require('pretty-print');
var options = {
  leftPadding: 2,
  rightPadding: 3
};

print({
  key: 'value'
  longerKey: 'value'
}, options);

// outputs
//
//   key        value
//   longerKey  value
```

### Array of objects

**Options**

* ` leftPadding ` - extra padding before the object key. Defaults to 2.
* ` rightPadding ` - extra padding after the object key. Defaults to 2.
* ` key ` - name of the value to use as the list key
* ` value ` - name of value to use as the list value

```javascript
var print = require('pretty-print');
var options = {
  rightPadding: 3,
  key: 'name',
  value: 'height'
};

print([
  {
    name: 'guy',
    height: 'short',
  },
  {
    name: 'girl',
    height: 'short'
  }
], options);

// outputs:
//
// guy:   short
// girl:  short
```

### Array of strings or numbers

```javascript
var print = require('pretty-print');

print(['val1', 'val2', 'val3'], {leftPadding: 0});

// outputs:
//
//  val1
//  val2
//  val3
```
