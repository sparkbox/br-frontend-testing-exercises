var test = require('tape');
var feedback = require('../lib/feedback');
var Feedback = feedback.Feedback;
var chalk = require('chalk');

feedback.colorFix(feedback.error('write tests, bro'));