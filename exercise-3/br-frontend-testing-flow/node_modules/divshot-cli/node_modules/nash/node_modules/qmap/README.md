# qmap

Async function map and queue.

Create methods and add those methods to a queue to be drained later.

## Install

```
npm install qmap --save
```

## Usage

Adding anonymous functions

```js
var Qmap = requier('qmap');
var queue = new Qmap();
// You may pass in an optional context as the first argument to bind each method to
// when instantiating the constructor

queue.push(function (done) {
  // Do something
  done();
});

queue.push(function (done) {
  // Do something else
  done();
});

queue.drain(function (err) {
  // All done
});
```

Adding named methods and anonymous functions

```js
var Qmap = require('qmap');
var queue = new Qmap();

queue.method('method1', function (done) {
  // Do something
  done();
});

queue.push('method1');
queue.push(function (done) {
  done();
});

queue.drain(function (err) {
  
});
```

## Api

### push(fn[, fn1, fn2, ....]);

Add any number of functions, either as arguments or as an array. These can be either anonymous functions or named methods declared by the `method()` function.

* `fn` - function or name of a method on the queue

### method(name, fn)

Create a named method to be used later in the queue with `push(methodName)`

* `name` - the name of the method
* `fn` - the function to fun when the named method gets added to the queue

## Run tests

```
npm install
npm test
```