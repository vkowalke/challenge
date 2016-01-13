'use strict';

var sinon     = require('sinon');
var request   = require('supertest');
var should    = require('should');
var storage   = require('../lib/storage');
var stubstore = require('./stubStorage');

describe( 'webWithStubData', function() {
	before(function() {
		request = request.agent('http://localhost:1610');
	});
	
	describe( 'GET /wines', function() {
		
		beforeEach( function() {
			var stub = sinon.stub(storage, 'findAll', stubstore.stubFindAll);
		});

		afterEach( function() {
			storage.findAll.restore();
		});
		
		it( 'get all stored wines', function( done ) {
			request.get('/wines')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					res.body.length.should.equal(2);
					done();
				});
		});
		
		it.skip( 'get all stored wines with query to year', function( done ) {
			request.get('/wines?year=2011')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					res.body.length.should.equal(1);
					done();
				});
		});
		
		it.skip( 'get all stored wines with query to name', function( done ) {
			request.get('/wines?name=Pinot')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					res.body.length.should.equal(1);
					done();
				});
		});
		
		it( 'get all stored wines with query to type', function( done ) {
			request.get('/wines?type=red')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					res.body.length.should.equal(2);
					done();
				});
		});
		
		it.skip( 'get all stored wines with query to country', function( done ) {
			request.get('/wines?country=France')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					res.body.length.should.equal(1);
					done();
				});
		});
		
		it.skip( 'get all stored wines with query year and type', function( done ) {
			request.get('/wines?year=2011&type=red')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					res.body.length.should.equal(1);
					done();
				});
		});
		
		it( 'get error with a invalid query string', function( done ) {
			request.get('/wines?servedWith=fish')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(400);
					res.body.error.should.equal('UNKNOWN_QUERY');
					done();
				});
		});
	});
	
	describe( 'POST /wines', function() {
		beforeEach(function() {
			var stub = sinon.stub(storage, 'insert', stubstore.stubInsert);
		});

		afterEach(function() {
			storage.insert.restore();
		});
		
		it( 'create a new wine successfully', function( done ) {
			var wineToStore = {
				id: 3,
				name: 'Cabernet sauvignon',
				year: 2013,
				country: 'France',
				type: 'red',
				description: 'The Sean Connery of red wines' };
			request.post( '/wines' )
				.send( wineToStore )
				.set( 'Accept', 'application/json')
				.expect( 'Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					res.body.name.should.equal(wineToStore.name);
					res.body.id.should.equal(wineToStore.id);
					res.body.year.should.equal(wineToStore.year);
					res.body.country.should.equal(wineToStore.country);
					res.body.type.should.equal(wineToStore.type);
					res.body.description.should.equal(wineToStore.description);
					done();
				});
		});
		
		it.skip( 'create a new wine failed because type is not valid', function( done ) {
			var wineToStore = {
				id: 3,
				name: 'Cabernet sauvignon',
				year: 2013,
				country: 'France',
				type: 'black',
				description: 'The Sean Connery of red wines' };
			request.post('/wines')
				.send( wineToStore )
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(400);
					res.body.error.should.equal('VALIDATION_ERROR');
					res.body.validation.type.should.equal('INVALID');
					done();
				});
		});
		
		it.skip( 'create a new wine failed because mandatory fields are missing', function( done ) {
			var wineToStore = {
				id: 3,
				name: 'Cabernet sauvignon',
				description: 'The Sean Connery of red wines' };
			request.post('/wines')
				.send( wineToStore )
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(400);
					res.body.error.should.equal('VALIDATION_ERROR');
					res.body.validation.type.should.equal('MISSING');
					done();
				});
		});
	});
	
	describe( 'PUT /wines/:id', function() {
		beforeEach(function() {
			var stub = sinon.stub(storage, 'update', stubstore.stubUpdate);
		});

		afterEach(function() {
			storage.update.restore();
		});
		
		it( 'update an existing wine successfully', function( done ) {
			var wineToStore = {
				id: 3,
				name: 'Cabernet sauvignon',
				year: 2013,
				country: 'France',
				type: 'red',
				description: 'Similar to merlot' };
			request.put('/wines/3')
				.send( wineToStore )
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					done();
				});
		});
		
		it.skip( 'update an existing wine failed because not existing', function( done ) {
			var wineToStore = {
				id: 999,
				name: 'Cabernet sauvignon',
				year: 2013,
				country: 'France',
				type: 'red',
				description: 'Similar to merlot' };
			request.put('/wines/3')
				.send( wineToStore )
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(400);
					res.body.error.should.equal('UNKNOWN_OBJECT');
					done();
				});
		});
	});
	
	describe( 'GET /wines/:id', function() {
		beforeEach( function() {
			var stub = sinon.stub(storage, 'find', stubstore.stubFind);
		});

		afterEach( function() {
			storage.find.restore();
		});
		
		it( 'get an existing wine successfully', function( done ) {
			request.get('/wines/3')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					done();
				});
		});
		
		it.skip( 'get an existing wine failed because not existing', function( done ) {
			request.get('/wines/999')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(400);
					res.body.error.should.equal('UNKNOWN_OBJECT');
					done();
				});
		});
	});
	
	describe( 'DELETE /wines/:id', function() {
		beforeEach(function() {
			var stub = sinon.stub(storage, 'del', stubstore.stubDel);
		});

		afterEach(function() {
			storage.del.restore();
		});
		
		it( 'delete an existing wine successfully', function( done ) {
			request.delete('/wines/3')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					done();
				});
		});
		
		it.skip( 'delete an existing wine failed because not existing', function( done ) {
			request.delete('/wines/999')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(400);
					res.body.error.should.equal('UNKNOWN_OBJECT');
					done();
				});
		});
	});
});

