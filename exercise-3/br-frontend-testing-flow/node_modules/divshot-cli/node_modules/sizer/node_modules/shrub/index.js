var path = require('path');
var walk = require('walk');
var async = require('async');
var util = require('util');

var Shrubber = function (dir) {
  var self = this;
  this.dir = dir;
  this._fns = [];
  this._files = [];
  this._tasksComplete = false;
  
  this.cargo = async.cargo(function (tasks, callback) {
    var waterfallList = self._buildTaskWaterfall(tasks);
    
    async.waterfall(waterfallList, function (err, files) {
      callback();
      async.nextTick(function () {
        if (self.onComplete) self.onComplete(files);
        
        // Track this progress
        self._files = files;
        self._tasksComplete = true;
      });
    });
  });
  
  getFileList(this.dir, function (files) {
    self._files = files;
    self.cargo.push(self._fns);
  });
};

Shrubber.prototype._buildTaskWaterfall = function (tasks) {
  var self = this;
  var waterfallList = [function (next) {
    next(null, self._files);
  }];
  
  tasks.forEach(function (task) {
    waterfallList.push(function (originalFileList, next) {
      self['run_' + task.type](originalFileList, task.fn, function (err, newFileList) {
        next(err, newFileList);
      });
    });
  });
  
  return waterfallList;
};

Shrubber.prototype._addFn = function (type, fn) {
  this._fns.push({
    type: type,
    fn: fn
  });
};

Shrubber.prototype.then = function (callback) {
  if (this._tasksComplete) return callback(this._files);
  this.onComplete = callback;
  return this;
};

// Methods
[
  {
    name: 'each',
    run: function (files, filterFn, callback) {
      async.each(files, function (file, cb) {
        filterFn(file.filePath, file.stats, cb);
      }, function () {
        callback(null, files);
      });
    }
  },
  {
    name: 'filter',
    run: function (files, filterFn, callback) {
      async.filter(files, function (file, cb) {
        filterFn(file.filePath, file.stats, cb);
      }, function (filteredFiles) {
        callback(null, filteredFiles);
      });
    }
  },
  {
    name: 'find',
    run: function (files, filterFn, callback) {
      async.detect(files, function (file, cb) {
        filterFn(file.filePath, file.stats, cb);
      }, function (file) {
        callback(null, file);
      });
    }
  }
].forEach(addMethod);

function addMethod (fn) {
  // Public method
  Shrubber.prototype[fn.name] = function (filterFn) {
    this._addFn(fn.name, filterFn);
    return this;
  };
  
  // Runner
  Shrubber.prototype['run_' + fn.name] = function (files, filterFn, callback) {
    if (!util.isArray(files)) files = [files];
    fn.run.call(this, files, filterFn, callback);
  }
}

function getFileList (dir, callback) {
  var files = [];
  
  var walker = walk.walk(dir, {
    followLinks: false
  });
  
  walker.on('file', function (root, stats, next) {
    var fullFilePath = path.join(root, stats.name);
    
    files.push({
      filePath: fullFilePath,
      stats: stats
    });
    
    next();
  });
  
  walker.on('end', function () {
    callback(files);
  });
};

module.exports = function (dir) {
  return new Shrubber(dir);
};