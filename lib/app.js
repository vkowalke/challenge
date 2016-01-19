'use strict';

var restify = require('restify');
var config  = require('./config');
var logger  = require('./logging');
var route   = require('./route');
var storage = require('./storage');

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.pre(restify.pre.userAgentConnection());
server.get('/wines/:id', route.getWine);
server.get('/wines', route.getWines);
server.post('/wines', route.postWine);
server.put('/wines/:id', route.putWine);
server.del('/wines/:id', route.delWine);

storage.init(function(err) {
	if (err) {
		logger.error('database init failed - program aborted');
	} else {
		server.listen(config.getPort(), function() {
			logger.prod('%s listening at %s', server.name, server.url);
		});
	}
});
