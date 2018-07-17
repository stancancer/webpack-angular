const webpack = require('webpack');
const merge = require('webpack-merge');
const common  = require('./webpack.common');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		host: 'localhost',
		port: 8070,
		hot: true
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NOOD_ENV': JSON.stringify('development')
		})
	]
})