import React from 'react';
import { render } from 'react-dom';
import { createStore,combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
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
  routing: routerReducer
});

const reactRouterReduxMiddleware = routerMiddleware(browserHistory)
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  reactRouterReduxMiddleware,
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
