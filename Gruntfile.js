module.exports = function(grunt) {
	
	grunt.initConfig({
		
		// grunt-env
		env: {
			dev: {
				NODE_ENV: 'development'
			},
			test: {
				NODE_ENV: 'test'
			}
		},
		
		// nodemon
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					ext: 'js, html',
					watch: ['server.js', 'config/**/*.js','app/**/*.js']
				}
			}
		},
		
		// mochaTest server unit tests
		mochaTest: {
			src: 'app/tests/**.*.js',
			options: {
				reporter: 'spec'
			}
		},
		
		// karma client unit tests
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		
		// protractor end 2 end
		protractor: {
			e2e: {
				options: {
					configFile: 'protractor.conf.js'
				}
			}
		},
		
		// js lint
		jshint: {
			all: {
				src: ['server.js', 'config/**/*.js', 'app/**/*.js', 'public/js/*.js', 'public/modules/**/*.js']
			},
			options: {
				node: true,
				jasmine: true
			}
		},
		
		// css lint
		csslint: {
			all: {
				src: 'public/modules/**/*.css'
			}
		},
		
		// watch
		watch: {
			js: {
				files: ['server.js', 'config/**/*.js', 'app/**/*.js', 'public/js/*.js', 'public/modules/**/*.js'],
				tasks: ['jshint']
			},
			css: {
				files: 'public/modules/**/*.css',
				tasks: ['csslint']
			}
		},
		
		// concurrent task runner
		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
		
	});
	
	// load task modules
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	
	// tasks 
	// grunt
	grunt.registerTask('default', ['env:dev','lint', 'concurrent']);
	
	// grunt test
	grunt.registerTask('test', ['env:test', 'mochaTest', 'karma', 'protractor']);
	
	// grunt lint
	grunt.registerTask('lint', ['jshint','csslint']);
	
};