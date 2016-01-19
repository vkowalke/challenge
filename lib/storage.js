'use strict';

var mongoose = require('mongoose');
var config   = require('./config');
var logger   = require('./logging');
var Wine     = require('./wine.model');
var db;

exports.init = function(callback) {
	mongoose.connect(config.getMongodbUri());
	db = mongoose.connection;
		
	db.on('error', function (err) {
		callback(err);
	});
	
	db.once('open', function() {
		callback();
	});
};

exports.find = function(id, callback) {
	Wine.findOne({ 'id': id }, function(err, wine) {
		callback(err, wine);
	});
};

exports.findAll = function(callback) {
	Wine.find().exec(function (err, wines) {
		logger.debug('return %d wines from database', wines.length);
		callback(err, wines);
	});
};

exports.findBy = function(query, callback) {
	Wine.find(query, function (err, wines) {
		logger.debug('return %d wines from database', wines.length);
		callback(err, wines);
	});
};

exports.insert = function(newWine, callback) {
	Wine.create(newWine, function(err, wine) {
		callback(err, wine);
	});
};

exports.update = function(id, updWine, callback) {
	Wine.findOneAndUpdate({ 'id': id }, { $set: updWine}, { 'new': true }, function(err, wine) {
		callback(err, wine);
	});
};

exports.del = function(id, callback) {
	Wine.findOneAndRemove({ 'id': id }, function (err, wine) {
		callback(err, wine);
	});
};