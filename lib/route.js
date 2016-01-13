'use strict';

var logger  = require( './logging' );
var service = require( './service' );

exports.getWine = function( req, res, next) {
	logger.prod('get wine ' + req.params.id );
	service.get( req.params.id, function( err, wine ) {
		res.send( 200, wine );
		next();
	});
};

exports.getWines = function( req, res, next) {
	logger.prod('get wines');
	var validKeys = [ 'year', 'name', 'type', 'country' ];
	var keys = Object.keys(req.query);
	logger.debug('query keys: ' + keys.length );
	for ( var idx = 0; idx < keys.length; idx++ ) {
		var checkKey = keys[idx];
		logger.debug('query key recognized: ' + checkKey );
		if ( validKeys.indexOf(checkKey) < 0 ) {
			logger.prod('query key NOT valid: ' + checkKey );
			var ret = { error: 'UNKNOWN_QUERY' }; 
			res.send( 400, ret );
			next();
			return;
		} 
	}	
	if ( req.query.type == 'red' ) {
		logger.debug('query string recognised');
	} else {
		logger.debug('no query string');
	}
	service.getAll( function( err, wines ) {
		res.send( 200, wines );
		next();
	});
};

exports.postWine = function( req, res, next) {
	logger.prod('post wine');
	service.save( req.body, function( err, storedWine ) {
		res.send( 200, storedWine );
		next();
	});
};

exports.putWine = function( req, res, next) {
	logger.prod('put wine ' + req.params.id );
	service.update( req.body, function( err, storedWine ) {
		res.send( 200, storedWine );
		next();
	});
};

exports.delWine = function( req, res, next) {
	logger.prod('del wine ' + req.params.id );
	service.del( req.params.id, function( err, status ) {
		res.send( 200, status );
		next();
	});
};