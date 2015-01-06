var path = require('path');

var expect = require('expect.js');
var sinon = require('sinon');


shrub(path.resolve(__dirname, './fixtures'))
  .find(function (filePath, stats, next) {
    next(stats.size < 1);
  })
  // .then(function (files) {
  //   console.log(files);
  // });
