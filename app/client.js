import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import fetchMiddleware from './redux/middleware/fetch-middleware';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import styles from './global.scss';

import { currentSearch } from './reducers/search';
import { currentTrackSummaryData } from './reducers/track-summary';
import { autocomplete } from './reducers/autocomplete';
import { currentVideo } from './reducers/video-player';
import { albumPage } from './reducers/album-page';
import { artistPage } from './reducers/artist-page';
import { topArtists } from './reducers/top-artists';
import { videoData } from './reducers/video-data';
import { playQueue } from './reducers/play-queue';
import routes from './components/routes';

const initialState = window.__PRELOADED_STATE__; // eslint-disable-line no-underscore-dangle

// this should live in the index.js of reducers: import rootReducer from './reducers'
const rootReducer = combineReducers({
  currentSearch,
  currentTrackSummaryData,
  currentVideo,
  videoData,
  albumPage,
  autocomplete,
  artistPage,
  topArtists,
  playQueue,
  routing: routerReducer,
});
const logger = createLogger(); // eslint-disable-line no-unused-vars
const reactRouterReduxMiddleware = routerMiddleware(browserHistory);
const createStoreWithMiddleware = applyMiddleware(
  fetchMiddleware,
  thunkMiddleware,
  reactRouterReduxMiddleware,
)(createStore);

const store = createStoreWithMiddleware(rootReducer, initialState);

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
