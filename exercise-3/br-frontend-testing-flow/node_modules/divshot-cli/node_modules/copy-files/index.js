var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var async = require('async');
var mkdirp = require('mkdirp');

module.exports = function (options, done) {
  done = done || function () {};
  
  mkdirp(options.dest, function (err) {
    if (err) return done(err);
    
    var streams = _(options.files)
      .map(function (filepath, filename) {
        var copyToPath = path.join(options.dest, filename);
        
        // Don't overwrite files that exist
        if (fs.existsSync(copyToPath) && !options.overwrite) return;
        
        var template = fs.createReadStream(filepath);
        var copyTo = fs.createWriteStream(copyToPath);
        
        return template.pipe(copyTo);
      })
      .filter(_.identity)
      .value();
    
    async.each(streams, function (stream, next) {
      stream.on('error', next);
      stream.on('close', next);
    }, done);
  });
}