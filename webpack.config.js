const config = require('./app/js/config');
const webpack = require('webpack');
const path = require('path');

module.exports = {
	target: 'electron-renderer',
	context: path.join(__dirname, 'app'),
	devtool: config.debug ? 'inline-sourcemap' : false,
	entry: './js/app.js',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['electron', 'react'],
					plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties', 'transform-es2015-classes']
				}
			}
		]
	},
	output: {
		path: path.join(__dirname, 'app'),
		filename: 'bundle.js'
	},
	plugins: config.debug ? [] : [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			mangle: false,
			sourcemap: false
		})
	]
};