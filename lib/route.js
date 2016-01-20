'use strict';

var logger  = require('./logging');
var service = require('./service');

exports.getWine = function(req, res, next) {
	logger.debug('route: get wine %d', req.params.id);
	service.get(req.params.id, function(err, wine) {
		if (err) {
			res.send(400, err);
			next();
		} else {
			res.send(200, wine);
			next();
		}
	});
};

exports.getWines = function(req, res, next) {
	logger.debug('route: get wines');
	service.getAll(req.query, function(err, wines) {
		if (err) {
			res.send(400, err);
			next();
		} else {
			res.send(200, wines);
			next();
		}
	});
};

exports.postWine = function(req, res, next) {
	logger.debug('route: post wine');
	service.save(req.body, function(err, storedWine) {
		if (err) {
			res.send(400, err);
			next();
		} else {
			res.send(200, storedWine);
			next();
		}
	});
};

exports.putWine = function(req, res, next) {
	logger.debug('route: put wine %d', req.params.id);
	service.update(req.params.id, req.body, function(err, storedWine) {
		if (err) {
			res.send(400, {'error': err});
			next();
		} else {
			res.send(200, storedWine);
			next();
		}
	});
};

exports.delWine = function(req, res, next) {
	logger.debug('route: del wine %d', req.params.id);
	service.del(req.params.id, function(err, status) {
		if (err) {
			res.send(400, {'error': err});
			next();
		} else {
			res.send(200, status);
			next();
		}
	});
};