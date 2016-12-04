var webpack = require('webpack');
var express = require('express');
var path = require('path');

module.exports = function(app) {

  var config = require('./webpack.config.js');

  if(process.env.NODE_ENV === 'production') {
    app.use(express.static(config.output.path))
  }
  else {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    var compiler = webpack(config);
    var devMiddleware = require('webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath,
      stats: {
        colors: true
      }
    });
    var hotMiddleware = require('webpack-hot-middleware')(compiler, {
      path: '/__webpack_hmr', heartbeat: 10 * 1000
    });

    app.use(devMiddleware);
    app.use(hotMiddleware);
  }

};
