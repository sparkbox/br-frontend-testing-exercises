# Van: Simple Multi-Process Execution

[![Code Climate](https://codeclimate.com/github/divshot/van.png)](https://codeclimate.com/github/divshot/van)

Van is meant to provide simple multi-process execution for Node scripts.

**Warning:** This library was created and intended for spinning up multiple
processes on a local development environment. It isn't designed or intended
(at least at this point) for any kind of production-server like usage. In
other words, this is a dev utility not a [foreman](https://github.com/ddollar/foreman)
replacement.

## Installation

    npm install --save van

## Interleave

The most common use case for Van is to run several processes at once and
interleave their output. Van also makes it easy to send termination signals
to all of the child processes at once as well as know when all child processes
have exited. An example:

```js
var Van = require("van")

var van = new Van({
  scripts: {
    jekyll: 'bundle exec jekyll build --watch', 
    server: 'superstatic -p 4000'
  }
});

// spawn the child processes and interleave output
van.start();

process.on('SIGINT', function() {
  // send a kill signal to each child process
  van.stop();
});
```

## Sequence

You may also wish to run a series of scripts in sequence, stopping execution
if any of them exit with a non-zero code. Van makes this easy, too!

```js
var van = new Van({
  scripts: [
    "my/first/script",
    "my/second/script"
  ]
});

van.run();
```

By calling `run()` instead of `start()` you are signaling that you wish to execute
the scripts sequentially.

## Custom Configuration

You may need more sophisticated configuration than the `scripts` option provides.
For these cases, you can manually add new passengers to the van with some additional
configuration options:

```js
var van = new Van();

van.addPassenger('path/to/script', {cwd: '/working/dir'});

van.start(); // or .run();
```

The available options are:

* **cwd:** pass in a working directory you'd like the script to run in
* **prefix:** when running in interleave mode, this will be the [prefix]
* **color:** choose a console color for the prefix. Can be any color supported by [colors](https://github.com/Marak/colors.js)

## License (MIT)

Copyright (c) 2014 Divshot, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
