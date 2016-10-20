import React from 'react';
import { render } from 'react-dom';
import { createStore,combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';
import fetchMiddleware from './redux/middleware/fetch-middleware'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import styles from './global.scss';

import {
  currentTrack, 
  currentArtist,
  currentAlbum,
  currentSearch, 
  currentArtistResults, 
  currentTrackResults, 
  currentAlbumResults,
  videoData,
} from './reducers/search'
import { currentVideo } from './reducers/video-player'
import { currentAlbumPageAlbum, currentAlbumPageError } from './reducers/album-page'
import routes from './components/routes'

const initialState = window.__PRELOADED_STATE__;

// this should live in the index.js of reducers: import rootReducer from './reducers'
const rootReducer = combineReducers({
  currentSearch,
  currentArtist,
  currentAlbum,
  currentTrack,
  currentArtistResults,
  currentTrackResults,
  currentAlbumResults,
  currentVideo,
  videoData,
  currentAlbumPageAlbum,
  currentAlbumPageError,
  routing: routerReducer
});
const logger = createLogger();
const reactRouterReduxMiddleware = routerMiddleware(browserHistory)
const createStoreWithMiddleware = applyMiddleware(
  fetchMiddleware,
  thunkMiddleware,
  reactRouterReduxMiddleware,
  logger,
)(createStore)

const store = createStoreWithMiddleware(rootReducer, initialState)

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router 
      history={browserHistory}
    >
      {routes}
    </Router>
  </Provider>,
  document.getElementById('react-view')
);
