'use strict';

var _        = require('lodash');
var logger   = require('./logging');
var storage  = require('./storage');
var validate = require('./validate');
const ERR_UNKNOWN_OBJ  = 'UNKNOWN_OBJECT';
const ERR_VALIDATION   = 'VALIDATION_ERROR';
const ERR_DUPLICATE_ID = 'DUPLICATE_ID';

exports.get = function(id, callback) {
	logger.debug('service: retrieving one wine with id %d', id);
	storage.find(id, function(err, wine) {
		if (err){
			callback({'error': err});
		} else if (wine) {
			callback(err, wine);
		} else {
			callback(ERR_UNKNOWN_OBJ);
		}
	});
};

exports.getAll = function(query, callback) {
	logger.debug('service: retrieving all wines');
	if (_.isEmpty(query)) {
		storage.findAll(function(err, wines) {
			if (err){
				callback({'error': err});
			} else {
				callback(err, wines);
			}
		});
	} else {
		var validateError = validate.validateKeys(query);
		if (validateError) {
			callback(validateError); 
		} else {
			storage.findBy(query, function(err, wines) {
				if (err){
					callback({'error': err});
				} else {
					callback(err, wines);
				}
			});
		}
	}
};

exports.save = function(wineToStore, callback) {
	logger.debug('service: save one wine with id %d', wineToStore.id);
	var validation = validate.validateNewEntry(wineToStore);
	if (_.isEmpty(validation)) {
		storage.find(wineToStore.id, function(err, wine) {
			if (err) {
				callback({'error': err});
			} else if (wine && ! _.isEmpty(wine)) {
				callback({'error': ERR_DUPLICATE_ID });
			} else {
				storage.insert(wineToStore, function(err, wine) {
					if (err){
						callback({'error': err});
					} else {
						callback(err, wine);
					}
				});
			}
		});
	} else {
		callback({'error': ERR_VALIDATION, 'validation': validation});
	} 
};

exports.update = function(id, wineToStore, callback) {
	logger.debug('service: update one wine with id %d', id);
	var validation = validate.validateUpdateEntry(wineToStore);
	if (_.isEmpty(validation)) {
		storage.update(id, wineToStore, function(err, wine) {
			if (err) {
				callback({'error': err});
			} else {
				if (wine) {
					callback(null, wine);
				} else {
					callback({'error': ERR_UNKNOWN_OBJ});
				}
			}
		});
	} else {
		callback({'error': ERR_VALIDATION, 'validation': validation});
	} 
};

exports.del = function(id, callback) {
	logger.debug('service: delete one wine with id %d', id);
	storage.del(id, function(err, wine) {
		if (err) {
			callback({'error': err});
		} else {
			if (wine) {
				callback(null, { success: true });
			} else {
				callback(ERR_UNKNOWN_OBJ);
			}
		}
	});
};
