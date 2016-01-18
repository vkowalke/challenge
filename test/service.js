'use strict';

var sinon     = require('sinon');
var should    = require('should');
var storage   = require('../lib/storage');
var service   = require('../lib/service');
var stubstore = require('./stubStorage');
var testwine  = require('./testwines');

describe( 'service unit test', function() {
	describe( '#get()', function() {
		var stub;
		
		before( function() {
			stub = sinon.stub(storage, 'find', stubstore.stubFind);
		});

		after( function() {
			stub.restore();
		});
		
		it( 'get a specific wine', function( done ) {
			service.get( 3, function( err, wine ) {
				should.not.exist(err);
				stub.callCount.should.equal(1);
				wine.id.should.equal( 3);
				done();
			});
		});

	});
	
	describe( '#get()', function() {
		var stub;
		
		before( function() {
			stub = sinon.stub(storage, 'find', stubstore.stubNonFind);
		});

		after( function() {
			stub.restore();
		});
		
		it( 'get a nonexisting wine', function (done) {
			service.get( 999, function( err, wine ) {
				should.exist(err);
				should.not.exist(wine);
				err.should.equal('UNKNOWN_OBJECT');
				done();
			});
		});
	});

	describe( '#getAll()', function() {
		var stub1;
		var stub2;
		
		before( function() {
			stub1 = sinon.stub(storage, 'findAll', stubstore.stubFindAll);
			stub2 = sinon.stub(storage, 'findBy', stubstore.stubFindBy);
		});

		after( function() {
			stub1.restore();
			stub2.restore();
		});
		
		it( 'get a list of all wines', function( done ) {
			service.getAll( {}, function( err, wines ) {
				should.not.exist(err);
				stub1.callCount.should.equal(1);
				wines.length.should.equal(2);
				done();
			});
		});
		
		it( 'get a list of some wines', function( done ) {
			service.getAll( { 'year': 1990 }, function( err, wines ) {
				should.not.exist(err);
				stub2.callCount.should.equal(1);
				wines.length.should.equal(1);
				done();
			});
		});
		
		it( 'get a list of some wines with invalid query string', function( done ) {
			service.getAll( { 'servedWith': 'fish' }, function( err, wines ) {
				should.exist(err);
				should.not.exist(wines);
				stub2.callCount.should.equal(1);
				err.should.equal('UNKNOWN_QUERY');
				done();
			});
		});
	});

	describe( '#save()', function() {
		var stub1;
		var stub2;
		
		before(function() {
			stub1 = sinon.stub(storage, 'find', stubstore.stubNoFind);
			stub2 = sinon.stub(storage, 'insert', stubstore.stubInsert);
		});

		after(function() {
			stub1.restore();
			stub2.restore();
		});
		
		it('insert a new wine', function (done) {
			service.save( testwine.getWine3(), function( err, wine ) {
				should.not.exist(err);
				stub1.callCount.should.equal(1);
				stub2.callCount.should.equal(1);
				wine.id.should.equal( 3);
				done();
			});
		});
		
		it('insert a new wine missing mandatory field', function (done) {
			service.save( testwine.getWineFieldsMissing(), function( err, wine ) {
				should.exist(err);
				should.not.exist(wine);
				err.error.should.equal('VALIDATION_ERROR');
				err.validation.type.should.equal('MISSING');
				done();
			});
		});
		
		it('insert a new wine with invalid type', function (done) {
			service.save( testwine.getWineInvalidType(), function( err, wine ) {
				should.exist(err);
				should.not.exist(wine);
				err.error.should.equal('VALIDATION_ERROR');
				err.validation.type.should.equal('INVALID');
				done();
			});
		});
	});

	describe('#update()', function () {
		var stub;
		
		before(function() {
			stub = sinon.stub(storage, 'update', stubstore.stubUpdate);
		});

		after(function() {
			stub.restore();
		});
		
		it('update a specific wine', function (done) {
			service.update( testwine.getWine3Update().id, testwine.getWine3Update(), function( err, wine ) {
				should.not.exist(err);
				stub.callCount.should.equal(1);
				wine.id.should.equal( 3 );
				wine.description.should.equal( 'Similar to merlot' );
				done();
			});
		});
		
		it.skip('update a wine which does not exist', function (done) {
			service.update( testwine.getWineNotExist().id, testwine.getWine3Update(), function( err, wine ) {
				should.not.exist(err);
				stub.callCount.should.equal(2);
				wine.id.should.equal( 3 );
				wine.description.should.equal( 'Similar to merlot' );
				done();
			});
		});
	});

	describe('#del()', function () {
		var stub;
		
		before(function() {
			stub = sinon.stub(storage, 'del', stubstore.stubDel);
		});

		after(function() {
			stub.restore();
		});
		
		it('delete a specific wine', function (done) {
			service.del( testwine.getWine3Update().id, function( err, status ) {
				should.not.exist(err);
				stub.callCount.should.equal(1);
				status.success.should.equal( true );
				done();
			});
		});
		
		it.skip('delete a wine which does not exist', function (done) {
			service.del( testwine.getWineNotExist().id, function( err, status ) {
				should.not.exist(err);
				stub.callCount.should.equal(2);
				status.success.should.equal( true );
				done();
			});
		});
	});
});
