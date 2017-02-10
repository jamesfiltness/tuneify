import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './redux/modules/store';
import styles from './styles/global.scss';
import auth0Service from './utils/auth0-service';

import { loggedIn } from './actions/auth';

import App from './components/app';
import Home from './components/home';
import Artist from './components/artist';
import Album from './components/album';
import PlaylistPage from './components/playlist-page';
import PageNotFound from './components/page-not-found';

const history = syncHistoryWithStore(browserHistory, store);

const authService = new auth0Service();

const authenticateRoute = (nextState, replace, callback) => {
  if (authService.isLoggedIn()) {
    callback();
  } else {
    authService.authenticate(() => {
      callback();
      store.dispatch(loggedIn());
    });
  }
};

const createElement = (Component, props) =>
  <Component authService={authService} {...props} />

render(
  <Provider store={store}>
    <Router
      createElement={createElement}
      history={history}
      onUpdate={() => window.scrollTo(0, 0)}
    >
    
  <Route component={App} path="/">
    <IndexRoute component={Home} />
    <Route component={Artist} path="artist/:mbid" />
    <Route component={Album} path="album/:artist/:album" />
    <Route component={Album} path="album/:mbid" />
    <Route component={Album} path="recent-plays" onEnter={authenticateRoute} />
    <Route component={PlaylistPage} path="playlist/:playlistid" onEnter={authenticateRoute} />
    <Route component={PageNotFound} path="*" />
  </Route>
    </Router>
  </Provider>,
  document.getElementById('react-view')
);
