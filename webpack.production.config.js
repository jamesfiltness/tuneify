const config = require('config');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, './app/client'),
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle-[chunkhash].js',
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
  plugins: [
    new ExtractTextPlugin('styles-[chunkhash].css'),
    new HtmlWebpackPlugin({
      title: config.get('app-title'),
      template: 'layout.ejs',
      window: {
        clientConfig: {
          endpoints: config.get('endpoints'),
        },
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      sourceMap: false,
    }),
  ],
};

