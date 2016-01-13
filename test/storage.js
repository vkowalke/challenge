'use strict';

var should  = require('should');
var storage = require('../lib/storage');

describe('storage', function() {
	describe('#findAll()', function () {
		it('get a list of wines', function () {
			storage.findAll( function( err, wines ) {
				wines.length.should.equal(2);
			});
		});
	});
	
	describe('#find()', function () {
		it('get a specific wine', function () {
			storage.find( 3, function( err, wine ) {
				wine.id.should.equal(3);
			});
		});
	});

	describe('#insert()', function () {
		it('insert a new wine', function () {
			var wineToStore = {
				id: 3,
				name: 'Cabernet sauvignon',
				year: 2013,
				country: 'France',
				type: 'red',
				description: 'The Sean Connery of red wines' };
			storage.insert( wineToStore, function( err, wine ) {
				wine.id.should.equal(3);
			});
		});
	});

	describe('#update()', function () {
		it('update a specific wine', function () {
			var wineToStore = {
				id: 3,
				name: 'Cabernet sauvignon',
				year: 2013,
				country: 'France',
				type: 'red',
				description: 'Similar to merlot' };
			storage.update( wineToStore, function( err, wine ) {
				wine.id.should.equal(3);
			});
		});
	});

	describe('#del()', function () {
		it('delete a specific wine', function () {
			storage.del( 3, function( err, status ) {
				status.success.should.equal( true );
			});
		});
	});
});
