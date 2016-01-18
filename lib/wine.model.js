'use strict';

var mongoose = require( 'mongoose' );

var wineSchema = mongoose.Schema({
	id: Number,
	name: String,
	year: Number,
	country: String,
	type: String,
	description: String
});

module.exports = mongoose.model('wine', wineSchema);