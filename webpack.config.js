const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: 'development',
	cache: true,
	entry: {
		bundle: path.resolve(__dirname, 'src/assets/js/init.js'),
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.[contenthash].js',
		clean: process.env.NODE_ENV === "production"
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: false,
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						}
					}],
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
		],
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist')
		},
		open: true,
		hot: true,
		compress: true,
		port: 3000,
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'style/main.css',
		}),
	],
}