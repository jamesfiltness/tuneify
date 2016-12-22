import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
entry: {
    app: [
      path.resolve(__dirname, './app/client'),
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
};

