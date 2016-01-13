'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					captureFile: 'result.txt',	// Optionally capture the reporter output to a file 
					quiet: false,				// Optionally suppress output to standard out (defaults to false) 
					clearRequireCache: false	// Optionally clear the require cache before running tests (defaults to false) 
				},
				src: [ 'test/**/*.js' ]
			}
		},
		eslint: {
			target: [ '*.js', 'lib/*.js' ]
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-eslint');

	// Default task.
	grunt.registerTask('default', [ 'mochaTest' ]);

};
