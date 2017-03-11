const config = require('config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, './app/client'),
    ],
  },
  output: {
    path: path.resolve(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: 'node_modules',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
        }),
        exclude: 'node_modules',
      },
      {
        test: /\.(jpg|png|gif|svg|woff|woff2|eot|ttf)(\?.*$|$)/i,
        loader: 'file-loader',
        exclude: 'node_modules',
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 8900,
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: config.get('app-title'),
      template: 'layout.ejs',
      window: {
        clientConfig: {
          endpoints: config.get('endpoints'),
          protocol: config.get('protocol'),
          baseurl: config.get('baseurl'),
        },
      },
    }),
    new ExtractTextPlugin('styles.css'),
  ],
};

