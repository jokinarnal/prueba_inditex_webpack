const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = env => {
	console.log(env)
	return {
		entry: "./src/index.js",
		output: {
			filename: "main.js",
			path: path.resolve(__dirname, "build"),
			clean: true
		},
		module: {
			// exclude node_modules
			rules: [
				{
						test: /\.s[ac]ss$/i,
						use: [
							// Creates `style` nodes from JS strings
							// fallback to style-loader in development
								env.mode !== "production" ?
								"style-loader" :
								{
									loader: MiniCssExtractPlugin.loader,
									options: {
										publicPath: path.join(__dirname, "build"),
									},
								},
							// Translates CSS into CommonJS
							{
								loader: "css-loader",
								options: {
									sourceMap: true,
								},
							},
							// Compiles Sass to CSS
							{
								loader: "sass-loader",
								options: {
									sourceMap: true,
									// Prefer `dart-sass`
									implementation: require("sass"),
									sassOptions: {
										outputStyle: "compressed",
									},
								},
							},
						],
					},
				{
					test: /\.(js|jsx)$/,         
					exclude: /node_modules/,
					use: ["babel-loader"],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "[name].css",
				chunkFilename: "[id].css",
			}),
			new HtmlWebpackPlugin({
				template: path.join(__dirname, "public", "index.html"),
			}),
		],
		// pass all js files through Babel
		resolve: {
			extensions: ["*", ".js", ".jsx"],   
		},
		devtool: env.mode !== "production" ? 'inline-source-map' : 'source-map',
		// devtool: 'source-map',
		optimization: {
			minimize: env.mode !== "production" ? false : true,
			// minimize:true,
			concatenateModules: true,
			minimizer: [
				new TerserPlugin({
					parallel: true,
					terserOptions: {
						// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
					},
				}),
				new CssMinimizerPlugin(),
			],
		},
		devServer: {
			static: {
				directory: path.join(__dirname, "build"),
			},
			port: 3000,
		}
	}
}	