import express from 'express'
import React from 'react'
import path from 'path'
import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import webpack from 'webpack'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import webpackDevMiddleware from 'webpack-dev-middleware'
import routes from './app/components/routes'
import { currentSearch, currentArtistResults, currentTrackResults, currentAlbumResults } from './app/reducers/search'
import { currentVideo } from './app/reducers/video-player'
import { routerReducer } from 'react-router-redux'

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(webpack({
    entry: {
      bundle: path.resolve(__dirname, 'app/client'),
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
      ],
    },
  }
)));
}

const store = createStore(
  combineReducers({
    currentSearch,
    currentArtistResults, 
    currentTrackResults, 
    currentAlbumResults,
    currentVideo,
  }),
  { 
    currentSearch: '',
    currentArtistResults: [], 
    currentTrackResults: [], 
    currentAlbumResults: [],
    currentVideo: '',
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
          <title>Isomorphic Redux routing</title>
        </head>
        <body>
          <div>
            <div id="react-view">${componentHTML}</div>
          </div>
          <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(serverState)}
          </script>
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
