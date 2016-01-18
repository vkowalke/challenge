'use strict';

var _        = require('lodash');
var logger  = require( './logging' );
const ERR_UNKNOWN_QUERY = 'UNKNOWN_QUERY';
const ERR_MISSING = 'MISSING';
const ERR_INVALID = 'INVALID';

exports.validateKeys = function( query ) {
	var validKeys = [ 'year', 'name', 'type', 'country' ];
	var keys = Object.keys( query);
	logger.debug('route: query %d keys: ', keys.length );
	for ( var idx = 0; idx < keys.length; idx++ ) {
		var checkKey = keys[idx];
		logger.debug('route: query key recognized: %s', checkKey );
		if ( validKeys.indexOf(checkKey) < 0 ) {
			logger.error('route: query key NOT valid: %s', checkKey );
			return ERR_UNKNOWN_QUERY;
		} 
	}
	return null;
};

exports.validateNewEntry = function( data ) {
	var validation = {};
	var validateNameError = validateName( data );
	if ( validateNameError ) {
		validation.name = validateNameError;
	}
	var validateYearError = validateYear( data );
	if ( validateYearError ) {
		validation.year = validateYearError;
	}
	var validateCountryError = validateCountry( data );
	if ( validateCountryError ) {
		validation.country = validateCountryError;
	}
	var validateTypeError = validateType( data );
	if ( validateTypeError ) {
		validation.type = validateTypeError;
	}
	return validation;
}

function validateName( data ) {
	if ( ! data.name ) {
		return ERR_MISSING;
	}
	return null;
};

function validateYear( data ) {
	if ( ! data.year ) {
		return ERR_MISSING;
	}
	if ( _.isNumber(data.year) && data.year > 1500 && data.year < 2100 ) {
		return null;
	} else {
		return ERR_INVALID;
	}
};

function validateCountry( data ) {
	if ( ! data.country ) {
		return ERR_MISSING;
	}
	// TODO validate from a list of countries?
	return null;
};

function validateType( data ) {
	if ( ! data.type ) {
		return ERR_MISSING;
	}
	if ( data.type == 'red' || data.type == 'white' || data.type == 'rose' ) {
		return null;
	} else {
		return ERR_INVALID;
	}
};
