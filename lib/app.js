/**
 * Agent main app
 */
'use strict';

var restify = require('restify');
var route   = require( './route' );
var logger  = require( './logging' );


var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.pre(restify.pre.userAgentConnection());
server.get('/wines/:id', route.getWine);
server.get('/wines', route.getWines);
server.post('/wines', route.postWine);
server.put('/wines/:id', route.putWine);
server.del('/wines/:id', route.delWine);

var port = process.env.PORT || 5000;
server.listen( port, function() {
	logger.prod('%s listening at %s', server.name, server.url);
});
