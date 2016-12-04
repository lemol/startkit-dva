var webpack = require('webpack');
var path = require('path');

var entry = {};
entry['app'] = ['./src'];

if(process.env.NODE_ENV === 'development') {
  var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';
  entry['app'].push(hotMiddlewareScript);
}

module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    },
    { test: /\.(html|jpg)$/, loader: "url-loader!file-loader" },
    { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: './dist'
  },
  debug: true,
  devtool: '#source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.NoErrorsPlugin()
  ]
};
