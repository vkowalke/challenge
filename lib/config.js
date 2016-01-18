'use strict';

exports.getPort = function() {
	return process.env.PORT || 5000;
};

exports.getMongodbUri = function() {
	return process.env.DBCONN || 'mongodb://localhost/wines';
};
