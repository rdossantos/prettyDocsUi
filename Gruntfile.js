module.exports = function(grunt) {
	//grunt.loadNpmTasks('grunt-connect-proxy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	var modRewrite = require('connect-modrewrite');
	
	grunt.initConfig({
		connect: {
			server: {
				options: {
				    port: 9001,
				    base: './',
				    keepalive:true,
				    // Modrewrite rule, connect.static(path) for each path in target's base
	    			middleware: function (connect, options) {
	    				var optBase = (typeof options.base === 'string') ? [options.base] : options.base;
	    				return [modRewrite(['!\\..+|/rest.*$ / [L]'])]
	    					.concat(optBase.map(function(path){ return connect.static(path); }));
	    			}
				}
			}
		}
	});

	// grunt.registerTask('default', 'Log some stuff.', function() {
	// 	grunt.log.write('Logging some stuff...').ok();
	// });
};