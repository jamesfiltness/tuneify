import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from '../app';
import Home  from '../home';
import Artist from '../artist';
import Album from '../album';
import Playlist from '../playlist';
import PageNotFound from '../page-not-found';
import auth0Service from '../../utils/auth0-service';
import { loggedIn, loggedOut } from '../../actions/auth';

const authService = new auth0Service();
 
export default class routes extends React.Component {


authenticateRoute(nextState, replace, callback) {
  if (authService.isLoggedIn()) {
    callback();
  } else {
    authService.authenticate(() => {
      callback();
    });
  }
}

render() {
 return (
  <Route component={App} path="/">
    <IndexRoute component={Home} />
    <Route component={Artist} path="artist/:mbid" />
    <Route component={Album} path="album/:artist/:album" />
    <Route component={Album} path="album/:mbid" />
    <Route component={Album} path="recent-plays" onEnter={this.authenticateRoute} />
    <Route component={Playlist} path="playlist/:playlistid" onEnter={this.authenticateRoute} />
    <Route component={PageNotFound} path="*" />
  </Route>
);
}
}

