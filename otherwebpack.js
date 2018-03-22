import path from 'path';
import webpack from 'webpack';

var serverConfig = {
	target: 'node',
	devtool: 'source-map',
	debug: true,
	entry: ['./server/index.js', './node_modules/webpack/hot/poll?1000'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'server.bundle.js'
	},
	resolve: {
		extensions: ["", ".js", ".jsx"],
	},
	externals: [/^[a-z]/],
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015-node4'],
				}
			},
			 {
		        test: /\.js$/,
		        exclude: /node_modules/,
		        loader: 'babel-loader',
		        query: {
		          presets: ['es2015-node4'],
	        	}
			 }
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};

var clientConfig = {
	target: 'web',
	debug: true,
	devtool: 'inline-source-map',
	noInfo: false,
	entry: [
		'eventsource-polyfill',
		'webpack-hot-middleware/client?reload=true',
		path.resolve(__dirname, 'client/src/index')
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'client.bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
	    loaders: [
	      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
	      {test: /(\.css)$/, loaders: ['style', 'css']},
	      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
	      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
	      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
	      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
	    ]
  }
};

module.exports = [serverConfig, clientConfig];
