'use strict';

var logger  = require( './logging' );
var storage = require('./storage');

exports.getAll = function(callback) {
	logger.prod('Retrieving all wines');
	storage.findAll( function( err, wines ) {
		callback( err, wines );
	});
};

exports.get = function( id, callback ) {
	logger.prod('Retrieving one wine with id ' + id );
	storage.find( id, function( err, wine ) {
		callback( err, wine );
	});
};

exports.save = function( wineToStore, callback ) {
	logger.prod('Save one wine with id ' + wineToStore.id );
	storage.insert( wineToStore, function( err, wine ) {
		callback( err, wine );
	});
};

exports.update = function( wineToStore, callback ) {
	logger.prod('Update one wine with id ' + wineToStore.id );
	storage.update( wineToStore, function( err, wine ) {
		callback( err, wine );
	});
};

exports.del = function( id, callback ) {
	logger.prod('Delete one wine with id ' + id );
	storage.del( id, function( err, status ) {
		callback( err, status );
	});
};