'use strict';

exports.getWine1 = function() {
	return {
		id: 1,
		name: 'Pinot noir',
		year: 2011,
		country: 'France',
		type: 'red',
		description: 'Sensual and understated'
	};
}; 

exports.getWine2 = function() {
	return {
		id: 2,
		name: 'Zinfandel',
		year: 1990,
		country: 'Croatia',
		type: 'red',
		description: 'Thick and jammy'
	};
};

exports.getWine3 = function() {
	return {
		id: 3,
		name: 'Cabernet sauvignon',
		year: 2013,
		country: 'France',
		type: 'red',
		description: 'The Sean Connery of red wines'
	};
};

exports.getWine3Update = function() {
	return {
		id: 3,
		description: 'Similar to merlot'
	};
};

exports.getWineNotExist = function() {
	return {
		id: 999,
		name: 'Cabernet sauvignon',
		year: 2013,
		country: 'France',
		type: 'red',
		description: 'Similar to merlot' 
	};
};

exports.getWineInvalidType = function() {
	return {
		id: 4,
		name: 'Cabernet sauvignon',
		year: 2013,
		country: 'France',
		type: 'black',
		description: 'The Sean Connery of red wines'
	};
};

exports.getWineFieldsMissing = function() {
	return {
		id: 3,
		name: 'Cabernet sauvignon',
		description: 'The Sean Connery of red wines'
	};
};