import express from 'express'
import React from 'react'
import path from 'path'
import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import webpack from 'webpack'
const ExtractTextPlugin = require('extract-text-webpack-plugin');
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import webpackDevMiddleware from 'webpack-dev-middleware'
import routes from './app/components/routes'
// use * to select all here? 
import { 
  currentSearch, 
  currentArtist,
  currentAlbum,
  currentArtistResults, 
  currentTrackResults, 
  currentAlbumResults, 
  currentTrack,
  videoData,
} from './app/reducers/search'
import { currentVideo } from './app/reducers/video-player'
import { currentAlbumPageAlbum } from './app/reducers/album-page'
import { routerReducer } from 'react-router-redux'

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(
    webpackDevMiddleware(
      webpack(
        {
          entry: {
            app: [
              path.resolve(__dirname, 'app/client'),
            ]
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
            ],
          },
          plugins: [
            new ExtractTextPlugin('styles.css'),
          ]
        }
      )
    )
  );
}

const store = createStore(
  combineReducers({
    currentTrack,
    currentArtist,
    currentAlbum,
    currentSearch,
    currentArtistResults, 
    currentTrackResults, 
    currentAlbumResults,
    currentVideo,
    currentAlbumPageAlbum,
    videoData,
  }),
  { 
    currentSearch: '',
    currentArtistResults: [], 
    currentTrackResults: [], 
    currentAlbumResults: [],
    currentVideo: '',
    currentArtist: {},
    currentTrack: {},
    currentAlbum: {},
    videoData: [],
    currentAlbumPageAlbum: {},
  }
);

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const componentHTML = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      
      // Get the redux state so that it can be passed down to rehydrate the client
      const serverState = store.getState();
      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Tuneify</title>
          <link rel=styleSheet href="/styles.css" type="text/css" />
        </head>
        <body>
          <div>
            <div id="react-view">${componentHTML}</div>
          </div>
          <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(serverState)}
          </script>
          <script src="https://apis.google.com/js/api.js"></script>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
      `;
      res.status(200).send(HTML);
    } else {
      res.status(404).send('Not found');
    }
  });
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
