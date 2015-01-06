# drainer

Queue and drain an array of functions in series.

## Install

```
npm install drainer --save
```

## Usage

```js
var drainer = require('drainer');

drainer([
  function (next) {
    next();
  },
  function (next) {
    next(null, 'some value');
  },
  function (arg1, next) {
    // arg1 == 'some value'
    next(null, 'final value');
  }
], function (err, finalValue) {
  // finalValue == 'final value';
});
```

### Handling Errors

Each function in the array recieves a callback, `next()`, to call when done. If only one argument is passed into that callback, it will assume that it is an error, exit the chain, and call the final callback with the error.

### Default Arguments

If you have arguments that you want to pass to each method without explicitly passing them each method, you can easily do that like this:

```js
var drainer = require('drainer');
var drain = drainer([
  function (defaultArg1, defaultArg2, next) {
    next();
  },
  function (defaultArg1, defaultArg2, next) {
    next();
  }
]);

drainer('defaultArg1', 'defaultArg2', function (err, defaultArg1, defaultArg2) {
  
});
```

### Passing Arguments from Method to Method

If you call the `next()` callback in the queued function with the first argument as `null`, any argument following will be passed to the next function in the queue.

The final callback will recieve any values passed from the last function in the function queue.

## Run Tests

```
npm install
npm test
```
