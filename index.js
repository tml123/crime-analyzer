/* eslint no-console: 0 */

const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
// import database configuration
const mongoose = require('./server/db/db.config');
// import the routes
const incidentRoutes = require('./server/routes/incidents.routes');

// webpack
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

// start the app and database
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const db = mongoose();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//basic router
const router = express.Router();
// for testing
router.get('/', function(req, res){
  res.json({msg: 'hello from api'});
});
// prefix with /api
app.use('/api', router);
app.use('/api', incidentRoutes);

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('/', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
