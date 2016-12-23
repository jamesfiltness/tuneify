import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import cookieParser from 'cookie-parser';
import isomorphic from '../routes/isomorphic';

export default function() {
const app = express();
app.use(cookieParser());

// TODO: Remove webpackdevmiddleare and use standard webpack approach
// Use https://www.npmjs.com/package/babel-plugin-transform-require-ignore to ignore css imports (CSS modules)
if (process.env.NODE_ENV !== 'production') {
  const devConfig = require('../../webpack.dev.config.js');
  app.use(
    webpackDevMiddleware(
      webpack(
        devConfig
      )
    )
  );
  
  isomorphic(app);
}
  return app;
}
