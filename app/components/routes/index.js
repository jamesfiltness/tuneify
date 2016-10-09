import React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from '../app'
import Home  from '../home'
import About from '../about'
import Artist from '../artist'
import Album from '../album'
import PageNotFound from '../page-not-found'

export default(
  <Route component={App} path="/">
    <IndexRoute component={Home} />
    <Route component={About} path="about" />
    <Route component={Artist} path="artist" />
    <Route component={Album} path="album" />
    <Route component={PageNotFound} path="*" />
  </Route>
);

