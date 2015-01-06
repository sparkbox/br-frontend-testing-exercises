feedback
========

Fancier console.log for Node.js cli apps

## Install

```
npm install feedback --save
```

## Usage

```javascript
var feedback = require('feedback');

// Strips all color from output
feedback.color = false;

//
feeback.write('message') // same as process.stdout
feedback.writeln('message') // same as write() but begins with a new line
feedback.info('message') // same as console.log()
feedback.success('message') // same as console.log(), but adds "Success: " to beginning
feedback.warn('message') // same as console.log(), but adds "Warning: " to beginning
feedback.error('message') // same as console.log() but add "Error: " to beginning
```

## Unit Testing

Feedback provides you with the ability to mute the output to the bash at any time. This is especially useful when you're writing unit tests. You can do this by:

```javascript
var feedback = require('feedback');

feedback.test = true;
feedback.success('Muted message'); // This message won't get printed to the bash

feedback.on('write', function (msg) {
  // Still have access each time a message 
  // should have been written to the bash.
});
```

## Run tests

```
npm install
npm test
```
