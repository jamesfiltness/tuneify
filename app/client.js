import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import fetchMiddleware from './redux/middleware/fetch-middleware';
import authMiddleware from './redux/middleware/auth-middleware';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import styles from './global.scss';

import App from './components/app';
import Home  from './components/home';
import Artist from './components/artist';
import Album from './components/album';
import PageNotFound from './components/page-not-found';
import auth0Service from './utils/auth0-service';
import reducers from './redux/modules/reducers';
import { loggedIn, loggedOut } from './actions/auth-actions';

const initialState = window.__PRELOADED_STATE__; // eslint-disable-line no-underscore-dangle

const logger = createLogger(); // eslint-disable-line no-unused-vars
const reactRouterReduxMiddleware = routerMiddleware(browserHistory);
const createStoreWithMiddleware = applyMiddleware(
  authMiddleware,
  fetchMiddleware,
  thunkMiddleware,
  reactRouterReduxMiddleware,
)(createStore);

// export the store so it can be imported and used to allow dispatch to work in non-react components
// such as the authService
const store = createStoreWithMiddleware(reducers, initialState);

const history = syncHistoryWithStore(browserHistory, store);

const authService = new auth0Service();

const authenticateRoute = (nextState, replace, callback) => {
  if (authService.isLoggedIn()) {
    callback();
  } else {
    authService.authenticate(() => {
      callback()
      store.dispatch(loggedIn());
    });
  }
}

const createElement = (Component, props) => {
  return <Component authService={authService} {...props} />
}

render(
  <Provider store={store}>
    <Router
      createElement={createElement}
      history={history}
    >
    
  <Route component={App} path="/">
    <IndexRoute component={Home} />
    <Route component={Artist} path="artist/:mbid" />
    <Route component={Album} path="album/:artist/:album" />
    <Route component={Album} path="album/:mbid" />
    <Route component={Album} path="recent-plays" onEnter={authenticateRoute} />
    <Route component={PageNotFound} path="*" />
  </Route>
    </Router>
  </Provider>,
  document.getElementById('react-view')
);
