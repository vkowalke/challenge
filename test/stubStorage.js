'use strict';

var sinon   = require('sinon');
var should  = require('should');
var storage = require('../lib/storage');
var service = require('../lib/service');

exports.stubFindAll = function(callback) {
	var result = [ {
		id: 1,
		name: 'Pinot noir',
		year: 2011,
		country: 'France',
		type: 'red',
		description: 'Sensual and understated'
	}, {
		id: 2,
		name: 'Zinfandel',
		year: 1990,
		country: 'Croatia',
		type: 'red',
		description: 'Thick and jammy'
	} ];
	callback( null, result );
}

exports.stubFind = function(id, callback ) {
	var result = {
		id: 3,
		name: 'Cabernet sauvignon',
		year: 2013,
		country: 'France',
		type: 'red',
		description: 'Similar to merlot' };
	callback(null, result );
}

exports.stubInsert = function(wine, callback ) {
	var result = {
		id: 3,
		name: 'Cabernet sauvignon',
		year: 2013,
		country: 'France',
		type: 'red',
		description: 'The Sean Connery of red wines' };
	callback(null, result );
}

exports.stubUpdate = function(wine, callback  ) {
	var result = {
		id: 3,
		name: 'Cabernet sauvignon',
		year: 2013,
		country: 'France',
		type: 'red',
		description: 'Similar to merlot' };
	callback(null, result );
}

exports.stubDel = function(id, callback ) {
	var result = {
		success: true };
	callback(null, result );
}
