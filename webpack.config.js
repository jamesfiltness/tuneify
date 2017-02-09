const config = require('config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, './app/client'),
    ],
  },
  output: {
    path: '/',
    publicPath: '/',
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
    proxy: {
      '*': {
        target: `http://localhost:${config.get('port')}`,
        secure: false,
        port: 8081,
      },
    },
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],
};

