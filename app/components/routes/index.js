import React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from '../app'
import Home  from '../home'
import About from '../about'
import PageNotFound from '../page-not-found'

export default(
  <Route component={App} path="/">
    <IndexRoute component={Home} />
    <Route component={About} path="about" />
    <Route component={PageNotFound} path="*" />
  </Route>
);

