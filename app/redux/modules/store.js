import { createStore,  applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import fetchMiddleware from '../middleware/fetch';
import authMiddleware from '../middleware/auth';
import lastFmCallCountMiddleware from '../middleware/lastfm';
import reducers from './reducers';

const initialState = window.__PRELOADED_STATE__; // eslint-disable-line no-underscore-dangle

const logger = createLogger(); // eslint-disable-line no-unused-vars
const reactRouterReduxMiddleware = routerMiddleware(browserHistory);
const createStoreWithMiddleware = applyMiddleware(
  authMiddleware,
  fetchMiddleware,
  lastFmCallCountMiddleware,
  thunkMiddleware,
  reactRouterReduxMiddleware,
)(createStore);

// export the store so it can be imported and used to allow dispatch to work in non-react components
// such as the authService
const store = createStoreWithMiddleware(reducers, initialState);

export default store
