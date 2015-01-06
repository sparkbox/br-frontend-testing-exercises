var drainer = require('../');
var test = require('tape');
var sinon = require('sinon');

test('executes all methods in queue', function (t) {
  var spy = sinon.spy();
  var queue = [
    function (next) {
      spy();
      next();
    },
    function (next) {
      spy();
      next();
    }
  ];
  
  var drain = drainer(queue)
  
  drain(function () {
    t.ok(spy.calledTwice);
    t.end();
  });
});

test('executes callback after all methods in queue have been called', function (t) {
  var drain = drainer([]);
  
  drain(function () {
    t.end();
  });
});

test('exits early with error as callback argument', function (t) {
  var spy = sinon.spy();
  
  var queue = [
    function (next) {
      next('the error');
    },
    function (next) {
      console.log('func2');
      next();
    }
  ];
  
  var drain = drainer(queue)
  
  drain(function (err) {
    t.equal(err, 'the error');
    t.notOk(spy.called);
    t.end();
  });
});

test('passes arguments to the next method in the list', function (t) {
  var passedArg;
  
  var queue = [
    function (next) {
      next(null, 'arg1');
    },
    function (arg1, next) {
      passedArg = arg1;
      next();
    }
  ];
  
  var drain = drainer(queue);
  drain(function () {
    t.equal(passedArg, 'arg1');
    t.end();
  });
});

test('passes last arguments to callback', function (t) {
  var drain = drainer([
    function (next) {
      next();
    },
    function (next) {
      next(null, 'arg1');
    }
  ]);
  
  drain(function (err, arg1) {
    t.equal(arg1, 'arg1');
    t.end();
  });
});

test('passes initial arguments to all methods', function (t) {
  var drain = drainer([
    function (arg1, next) {
      t.equal(arg1, 'arg1', 'passed default arguments to first method');
      next();
    },
    function (arg1, next) {
      t.equal(arg1, 'arg1', 'passed default arguments to second method');
      next();
    }
  ]);
  
  drain('arg1', function (err, arg1) {
    t.equal(arg1, 'arg1', 'passed argument to calback');
    t.end();
  });
});

test('passes multiple initial arguments to all methods', function (t) {
  var drain = drainer([
    function (arg1, arg2, arg3, next) {
      t.equal(arg1, 'arg1', 'passed default arguments to first method');
      t.equal(arg2, 'arg2', 'passed default arguments to first method');
      t.equal(arg3, 'arg3', 'passed default arguments to first method');
      next();
    },
    function (arg1, arg2, arg3, next) {
      t.equal(arg1, 'arg1', 'passed default arguments to first method');
      t.equal(arg2, 'arg2', 'passed default arguments to first method');
      t.equal(arg3, 'arg3', 'passed default arguments to first method');
      next();
    }
  ]);
  
  drain('arg1', 'arg2', 'arg3', function (err, arg1, arg2, arg3) {
    t.equal(arg1, 'arg1', 'passed argument to calback');
    t.equal(arg2, 'arg2', 'passed argument to calback');
    t.equal(arg3, 'arg3', 'passed argument to calback');
    t.end();
  });
});

test('passes arguments alongside default arguments', function (t) {
  var passedArg;
  var drain = drainer([
    function (defaultArg1, next) {
      next(null, 'arg1');
    },
    function (defaultArg1, arg1, next) {
      passedArg = arg1;
      next();
    }
  ]);
  
  drain('defaultArg1', function (err, defaultArg1) {
    t.equal(defaultArg1, 'defaultArg1', 'passed default arg');
    t.equal(passedArg, 'arg1', 'pass last arg');
    t.end();
  });
});