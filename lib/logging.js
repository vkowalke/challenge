'use strict';

var winston = require('winston');
var moment	= require('moment');
var path    = require('path');

var levels = {
	debug: 0,
	prod: 1,
	warn: 2,
	error: 3
};

var colors = {
	debug: 'blue',
	prod: 'green',
	warn: 'yellow',
	error: 'red'
};

var loggingConf = {
	level: 'prod',
	path: 'wines.log',
	localTimeFormat: 'YYYY-MM-DDTHH:mm:ss.SSS',
	maxsize: 1000000,
	maxFiles: 20
};

function buildTimestampFunction() {
	return moment().format(loggingConf.localTimeFormat);
}

var consoleParameters = {
	name: 'console',
	level: loggingConf.level,
	colorize: true,
	json: false,
	timestamp: buildTimestampFunction
};

var fileParameters = {
	name: 'file',
	level: loggingConf.level,
	filename: path.resolve(loggingConf.path),
	maxsize: loggingConf.maxsize,
	maxFiles: loggingConf.maxFiles,
	json: false,
	timestamp: buildTimestampFunction
};

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(consoleParameters),
		new (winston.transports.File)(fileParameters)
	],
	levels: levels,
	colors: colors
});

exports.debug = function debug() {
	var args = Array.prototype.slice.call(arguments, 0);
	logger.debug.apply(logger, args);
};

exports.prod = function prod() {
	var args = Array.prototype.slice.call(arguments, 0);
	logger.prod.apply(logger, args);
};

exports.warn = function warn() {
	var args = Array.prototype.slice.call(arguments, 0);
	logger.warn.apply(logger, args);
};

exports.error = function error() {
	var args = Array.prototype.slice.call(arguments, 0);
	logger.error.apply(logger, args);
};