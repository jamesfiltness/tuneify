import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from '../app';
import Home  from '../home';
import Artist from '../artist';
import Album from '../album';
import PageNotFound from '../page-not-found';

export default(
  <Route component={App} path="/">
    <IndexRoute component={Home} />
    <Route component={Artist} path="artist/:artist" />
    <Route component={Album} path="album/:artist/:album" />
    <Route component={PageNotFound} path="*" />
  </Route>
);

