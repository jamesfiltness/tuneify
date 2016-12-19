import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

import isomorphic from '../routes/isomorphic';

export default function() {
const app = express();

// TODO: Remove webpackdevmiddleare and use standard webpack approach
// Use https://www.npmjs.com/package/babel-plugin-transform-require-ignore to ignore css imports (CSS modules)
if (process.env.NODE_ENV !== 'production') {
  app.use(
    webpackDevMiddleware(
      webpack(
        {
          entry: {
            app: [
              path.resolve(__dirname, '../../app/client'),
            ],
          },
          output: {
            path: '/',
          },
          module: {
            loaders: [
              {
                test: /\.js?$/,
                loader: 'babel',
                exclude: 'node_modules',
              },
              {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass'),
                exclude: 'node_modules',
              },
              {
                test: /\.(jpg|png|gif|svg|woff|woff2|eot|ttf)(\?.*$|$)/i,
                loader: 'file',
                exclude: 'node_modules',
              },
            ],
          },
          plugins: [
            new ExtractTextPlugin('styles.css'),
          ],
        }
      )
    )
  );

  isomorphic(app);
}
  return app;
}
