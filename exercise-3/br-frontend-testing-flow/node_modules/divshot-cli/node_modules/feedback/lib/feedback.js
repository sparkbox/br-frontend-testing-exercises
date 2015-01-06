var EventEmitter = require('events').EventEmitter;
var chalk = require('chalk');

function Feedback () {
  this.color = true;
  this.test = false;
}

Feedback.prototype = Object.create(EventEmitter.prototype);

Feedback.prototype._msg = function (msg) {
  return msg || '';
};

Feedback.prototype._log = function (msg) {
  var self = this;
  
  if (!this.test) console.log(this.colorFix(msg.toString()));
  
  process.nextTick(function () {
    self.emit('write', msg);
  });
};

Feedback.prototype.colorFix = function (msg) {
  if(this.color) { return msg; }
  return chalk.stripColor(msg);
};

Feedback.prototype.write = function (msg) {
  msg = msg || '';
  
  process.stdout.write(
    this.colorFix(this._msg(msg))
  );
  
  return this;
};

Feedback.prototype.writeln = function (msg) {
  this.write(
    this.colorFix('\n' + this._msg(msg))
  );
  
  return this;
};

Feedback.prototype.info =  function (msg) {
  this._log(this._msg(msg));
  return this;
};

Feedback.prototype.success = function (msg) {
  this._log(chalk.green('Success:') + ' ' + this._msg(msg));
  return this;
};

Feedback.prototype.warn = function (msg) {
  this._log(chalk.yellow('Warning:') + ' ' + this._msg(msg));
  return this;
};

Feedback.prototype.error = function (msg) {
  this._log(chalk.red('Error:') + ' ' + this._msg(msg));
  return this;
};

var feedback = new Feedback();
feedback.Feedback = Feedback;

module.exports = feedback;