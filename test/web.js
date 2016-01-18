'use strict';

var mongoose  = require( 'mongoose' );
var request   = require('supertest');
var should    = require('should');
var config    = require( '../lib/config' );
var Wine      = require( '../lib/wine.model');
var testwine  = require('./testwines');
var tablename = 'wines';

describe( 'full functional test', function() {
	var connected = false;
	var db;
	
	before(function() {
		request = request.agent('http://localhost:' + config.getPort());
	});
	
	describe( 'GET /wines/:id', function() {
		
		it( 'get a wine', function( done ) {
			request.get('/wines/' + testwine.getWine1().id )
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if ( res.status == 200 ) {
						res.status.should.equal(200);
					} else {
						res.status.should.equal(400);
						res.body.error.should.equal('UNKNOWN_OBJECT');
					}
					done();
				});
		});
	});
	
	describe( 'GET /wines', function() {
		
		it( 'get all stored wines', function( done ) {
			request.get('/wines')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					done();
				});
		});
		
		it( 'get all stored wines with query to year', function( done ) {
			request.get('/wines?year=2011')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					done();
				});
		});
		
		it( 'get all stored wines with query to name', function( done ) {
			request.get('/wines?name=Pinot noir')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					done();
				});
		});
		
		it( 'get all stored wines with query to type', function( done ) {
			request.get('/wines?type=red')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					done();
				});
		});
		
		it( 'get all stored wines with query to country', function( done ) {
			request.get('/wines?country=France')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					done();
				});
		});
		
		it( 'get all stored wines with query year and type', function( done ) {
			request.get('/wines?year=2011&type=red')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
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
		
		it( 'create a new wine successfully', function( done ) {
			request.post( '/wines' )
				.send( testwine.getWine3() )
				.set( 'Accept', 'application/json')
				.expect( 'Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					res.body.name.should.equal(testwine.getWine3().name);
					res.body.id.should.equal(testwine.getWine3().id);
					res.body.year.should.equal(testwine.getWine3().year);
					res.body.country.should.equal(testwine.getWine3().country);
					res.body.type.should.equal(testwine.getWine3().type);
					res.body.description.should.equal(testwine.getWine3().description);
					done();
				});
		});
		
		it( 'create a new wine failed because type is not valid', function( done ) {
			request.post('/wines')
				.send( testwine.getWineInvalidType() )
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(400);
					res.body.error.should.equal('VALIDATION_ERROR');
					res.body.validation.type.should.equal('INVALID');
					done();
				});
		});
		
		it( 'create a new wine failed because mandatory fields are missing', function( done ) {
			request.post('/wines')
				.send( testwine.getWineFieldsMissing() )
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
		
		it( 'update an existing wine successfully', function( done ) {
			request.put('/wines/' + testwine.getWine3Update().id )
				.send( testwine.getWine3Update() )
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					done();
				});
		});
		
		it( 'update an existing wine failed because not existing', function( done ) {
			request.put('/wines/' + testwine.getWineNotExist().id )
				.send( testwine.getWineNotExist() )
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

		it( 'delete an existing wine successfully', function( done ) {
			request.delete('/wines/' + testwine.getWine3().id)
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					res.status.should.equal(200);
					done();
				});
		});
		
		it( 'delete an existing wine failed because not existing', function( done ) {
			request.delete('/wines/' + testwine.getWineNotExist().id)
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

