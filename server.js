'use strict';
/**
 * Module dependencies.
 */
var express = require('express');
var webpackServer = require('./webpack.server');
var path = require('path');

/**
 * Create Express server.
 */
var app = express();

app.set('port',
  process.env.NODE_ENV=='test' ? (process.env.PORT_TEST || 3111) : (process.env.PORT || 3000)
);
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: 31557600000
}));

if (process.env.NODE_ENV==='production') {
  app.use(express.static(path.join(__dirname, 'dist'), {
    maxAge: 31557600000
  }));
}

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
})

/**
 * Webpack Client
 */
webpackServer(app);

/**
 * Start Express server with socketio.
 */
var server = require('http').createServer(app);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
