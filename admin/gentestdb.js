'use strict';

var mongoose  = require( 'mongoose' );
var config    = require( '../lib/config' );
var Wine      = require( '../lib/wine.model');

mongoose.connect( config.getMongodbUri() );
var db = mongoose.connection;

db.on('error', function (err) {
	callback( err );
});

db.once('open', function() {
	var wine1 = new Wine({
		id: 1,
		name: 'Pinot noir',
		year: 2011,
		country: 'France',
		type: 'red',
		description: 'Sensual and understated'
	});
	
	var wine2 = new Wine({
		id: 2,
		name: 'Zinfandel',
		year: 1990,
		country: 'Croatia',
		type: 'red',
		description: 'Thick and jammy'
	});
	
	wine1.save(function( err, wine ) {
		wine2.save(function( err, wine ) {
			console.log('test database created');
			db.close();
		});
	});
});

