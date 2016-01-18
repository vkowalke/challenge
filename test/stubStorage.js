'use strict';

var testwine = require('./testwines');


exports.stubFindAll = function(callback) {
	var result = [ testwine.getWine1(), testwine.getWine2() ];
	callback( null, result );
};

exports.stubFindBy = function(query, callback) {
	var result = [ testwine.getWine1() ];
	callback( null, result );
};

exports.stubNoFind = function(id, callback ) {
	callback(null, {} );
};

exports.stubNonFind = function(id, callback ) {
	callback(null, null );
};

exports.stubFind = function(id, callback ) {
	callback(null, testwine.getWine3() );
};

exports.stubInsert = function(wine, callback ) {
	callback(null, testwine.getWine3() );
};

exports.stubUpdate = function( id, wine, callback  ) {
	callback(null, testwine.getWine3Update() );
};

exports.stubDel = function(id, callback ) {
	callback(null, testwine.getWine3Update());
};
