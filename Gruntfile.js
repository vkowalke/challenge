'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					quiet: false,
					clearRequireCache: false
				},
				src: [ 'test/**/*.js' ]
			}
		},
		eslint: {
			files: [ '*.js', 'lib/*.js', 'test/*.js' ]
		},
		execute: {
			genTestDB: {
				src: [ 'admin/gentestdb.js' ]
			}
		}		
	});

	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-execute');

	grunt.registerTask('default', [ 'mochaTest' ]);

};
