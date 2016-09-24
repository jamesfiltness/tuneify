import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { currentSearch, currentArtistResults, currentTrackResults, currentAlbumResults } from './reducers/search'
import { currentVideo } from './reducers/video-player'
import routes from './components/routes'

const initialState = window.__PRELOADED_STATE__;

// this should live in the index.js of reducers: import rootReducer from './reducers'
const rootReducer = combineReducers({
  currentSearch,
  currentArtistResults,
  currentTrackResults,
  currentAlbumResults,
  currentVideo,
  routing: routerReducer
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
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
