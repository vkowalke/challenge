'use strict';

var _       = require('lodash');
var logger  = require('./logging');
const ERR_UNKNOWN_QUERY = 'UNKNOWN_QUERY';
const ERR_MISSING = 'MISSING';
const ERR_INVALID = 'INVALID';

exports.validateKeys = function(query) {
	var validKeys = [ 'year', 'name', 'type', 'country' ];
	var keys = Object.keys(query);
	logger.debug('route: query %d keys: ', keys.length);
	for (var idx = 0; idx < keys.length; idx++) {
		var checkKey = keys[idx];
		logger.debug('route: query key recognized: %s', checkKey);
		if (validKeys.indexOf(checkKey) < 0) {
			logger.error('route: query key NOT valid: %s', checkKey);
			return ERR_UNKNOWN_QUERY;
		} 
	}
	return null;
};

exports.validateNewEntry = function(data) {
	var validation = {};
	var validateIdError = validateIdMandatory(data);
	if (validateIdError) {
		validation.id = validateIdError;
	}
	var validateNameError = validateNameMandatory(data);
	if (validateNameError) {
		validation.name = validateNameError;
	}
	var validateYearError = validateYearMandatory(data);
	if (validateYearError) {
		validation.year = validateYearError;
	}
	var validateCountryError = validateCountryMandatory(data);
	if (validateCountryError) {
		validation.country = validateCountryError;
	}
	var validateTypeError = validateTypeMandatory(data);
	if (validateTypeError) {
		validation.type = validateTypeError;
	}
	return validation;
};

exports.validateUpdateEntry = function(data) {
	var validation = {};
	if (data.id) {
		var validateIdError = validateId(data);
		if (validateIdError) {
			validation.id = validateIdError;
		}
	}
	if (data.year) {
		var validateYearError = validateYear(data);
		if (validateYearError) {
			validation.year = validateYearError;
		}
	}
	if (data.country) {
		var validateCountryError = validateCountry(data);
		if (validateCountryError) {
			validation.country = validateCountryError;
		}
	}
	if (data.type) {
		var validateTypeError = validateType(data);
		if (validateTypeError) {
			validation.type = validateTypeError;
		}
	}
	return validation;
};

function validateIdMandatory(data) {
	if (! data.id) {
		return ERR_MISSING;
	} else {
		return validateId(data);
	}
}

function validateId(data) {
	if (_.isNumber(data.id) && data.id > 0) {
		return null;
	} else {
		return ERR_INVALID;
	}
}

function validateNameMandatory(data) {
	if (! data.name) {
		return ERR_MISSING;
	}
	return null;
}

function validateYearMandatory(data) {
	if (! data.year) {
		return ERR_MISSING;
	} else {
		return validateYear(data);
	}
}

function validateYear(data) {
	if (_.isNumber(data.year) && data.year > 1500 && data.year < 2100) {
		return null;
	} else {
		return ERR_INVALID;
	}
}

function validateCountryMandatory(data) {
	if (! data.country) {
		return ERR_MISSING;
	}
	
	return null;
}

function validateCountry(data) {
	switch (data.country) {
	// TODO validate from a list of countries?
	case 'France':
	case 'Croatia':
		return null;
	default:
		return null; // return ERR_INVALID;
	}
}
	
function validateTypeMandatory(data) {
	if (! data.type) {
		return ERR_MISSING;
	} else {
		return validateType(data);
	}
}

function validateType(data) {
	if (data.type == 'red' || data.type == 'white' || data.type == 'rose') {
		return null;
	} else {
		return ERR_INVALID;
	}
}
