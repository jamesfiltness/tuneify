var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var precss = require('precss');
var postcssImport = require('postcss-import');
/*The idea is that we detect npm lifecycle event (start, build, ...) 
and then branch and merge based on that.*/
var merge = require('webpack-merge');

/* Detects npm lifecycle event, i.e. has npm start been hit
   if so then merge the common config in with the start specific config */
var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

/* PASS THE TARGET ENVIRONMENT TO BABEL */
process.env.BABEL_ENV = TARGET;

var common = {
  entry: APP_PATH,
  resolve: {
    /* evalualetd from left to right so if a more specific match is 
    found further to the right (i.e. a .web.js extension) then that 
    is used instead of the default */
    /* Setting a '' flag allows us to refer to jsx files without 
    extension if wanted - but it is good to be explicit */
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  module: {
    /* Loaders perform transformations on source files and return new source
       Loader can be chained */
    loaders: [
      {
        test: /\.css$/,
        /* css loader deals with @imports and url statments in css
           and style loader deals with css require statements in js */
        loader: 'style!css?localIdentName=[name]__[local]___[hash:base64:5]!postcss',
        /* can also set up and exclude path */
        /* always set up an include as otherwise webpack will traverse all files
           in base directory
           Better to set up includes rather and excludes as you never know
           files will end up in the directory structure */
        include: APP_PATH
      },
      /* use babel to convert es6 js/jsx files */
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH
      }
    ]
  },
  postcss: function () {
        return [precss, postcssImport({
                addDependencyTo: webpack
            })];
  },
  plugins : [
      new HtmlwebpackPlugin({
        title : 'Music App'
      })
  ]
};

 if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    /* OUTPUT SOURCE MAPS - is this working?  */
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      port: 1111,
      hot: true,
      /* this is needed for hot module replacement */
      inline: true,
      progress: true
    },
    plugins: [
    /* Need to understand how this works better */
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
