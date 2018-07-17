const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5,
					minSize: 1,
				},
				vendor: {
					test: /[\\/]src[\\/]lib/,
					chunks: "all",
					name: "vendor",
					priority: 0,
					enforce: true
				},
				angular: {
					test: /[\\/]node_modules[\\/]angular/,
					chunks: "initial",
					name: 'angular',
					priority: -10
				},
			}
		}
	},
	output: {
		filename: '[name]-[hash:8].bundle.js',
		chunkFilename: 'module/[name]-[chunkhash:8].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: "umd"
	},
	plugins: [
		/* 构建前先清空dist目录 */
		new CleanWebpackPlugin(['dist']),
		/* 将指定文件作为编译模板 */
		new HtmlWebpackPlugin({
			title: 'Development',
			template: './index.html'
		}),
		/* hot更新所需配置 */
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		/* 提取css文件 */
		new MiniCssExtractPlugin({
			filename: './[name].css',
			chunkFilename: './[id].css'
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					// 'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: "[name]-[hash:8].[ext]",
							outputPath: 'assets/imgs/',
							context: '',
							useRelativePath: true
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader:'file-loader',
						options: {
							name: "[name]-[hash:8].[ext]",
							outputPath: 'assets/fonts/'
						}
					}
				]
			},
			{
				test: /\.(html)$/,
				use: ['html-loader']
			}
		]
	}
}