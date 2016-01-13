'use strict';

var sinon     = require('sinon');
var should    = require('should');
var storage   = require('../lib/storage');
var service   = require('../lib/service');
var stubstore = require('./stubStorage');

describe( 'service', function() {
	describe( '#getAll()', function() {
		before( function() {
			var stub = sinon.stub(storage, 'findAll', stubstore.stubFindAll);
		});

		after( function() {
			storage.findAll.restore();
		});
		
		it( 'get a list of wines', function( done ) {
			service.getAll( function( err, wines ) {
				wines.length.should.equal(2);
				done();
			});
		});
	});

	describe( '#get()', function() {
		before( function() {
			var stub = sinon.stub(storage, 'find', stubstore.stubFind);
		});

		after( function() {
			storage.find.restore();
		});
		
		it( 'get a specific wine', function( done ) {
			service.get( 3, function( err, wine ) {
				wine.id.should.equal( 3);
				done();
			});
		});
	});

	describe( '#save()', function() {
		before(function() {
			var stub = sinon.stub(storage, 'insert', stubstore.stubInsert);
		});

		after(function() {
			storage.insert.restore();
		});
		
		it('insert a new wine', function (done) {
			var wineToStore = {
				id: 3,
				name: 'Cabernet sauvignon',
				year: 2013,
				country: 'France',
				type: 'red',
				description: 'The Sean Connery of red wines' };
			service.save( wineToStore, function( err, wine ) {
				wine.id.should.equal( 3);
				done();
			});
		});
	});

	describe('#update()', function () {
		before(function() {
			var stub = sinon.stub(storage, 'update', stubstore.stubUpdate);
		});

		after(function() {
			storage.update.restore();
		});
		
		it('update a specific wine', function (done) {
			var wineToStore = {
				id: 3,
				name: 'Cabernet sauvignon',
				year: 2013,
				country: 'France',
				type: 'red',
				description: 'Similar to merlot' };
			service.update( wineToStore, function( err, wine ) {
				wine.id.should.equal( 3);
				done();
			});
		});
	});

	describe('#del()', function () {
		before(function() {
			var stub = sinon.stub(storage, 'del', stubstore.stubDel);
		});

		after(function() {
			storage.del.restore();
		});
		
		it('delete a specific wine', function (done) {
			service.del( 3, function( err, status ) {
				status.success.should.equal( true );
				done();
			});
		});
	});
});
