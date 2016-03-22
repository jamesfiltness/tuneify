module.exports = function karmaConfig (config) {
	config.set({
		frameworks: [
			// Reference: https://github.com/karma-runner/karma-mocha
			// Set framework to mocha
			'mocha'
		],
		reporters: [
			// Reference: https://github.com/mlex/karma-spec-reporter
			// Set reporter to print detailed results to console
			'spec'
		],

		files: [
			// Reference: https://www.npmjs.com/package/phantomjs-polyfill
			// Needed because React.js requires bind and phantomjs does not support it
			'node_modules/phantomjs-polyfill/bind-polyfill.js',
			// Grab all files in the tests directory that contain _test.
			'app/**/*.spec.js'
		],

		preprocessors: {
			// Reference: http://webpack.github.io/docs/testing.html
			// Reference: https://github.com/webpack/karma-webpack
			// Convert files with webpack and load sourcemaps
			'app/**/*.spec.js': ['webpack', 'sourcemap']
		},

		browsers: [
			// Run tests using PhantomJS
			//'PhantomJS',
			'Chrome'
		],

		singleRun: false,

		// Test webpack config
		webpack: require('./webpack.config'),

		// Hide webpack build information from output
		webpackMiddleware: {
		    noInfo: true
		}
	});
};