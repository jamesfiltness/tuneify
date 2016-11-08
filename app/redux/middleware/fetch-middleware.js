import fetch from 'isomorphic-fetch'

const fetchMiddleware  = store => next => action => { 
  let queryString = '';
  // if action is a function this middleware is  not interested in it
  // it's probably a thunk, so just return it so that thunk middleware
  // can deal with it
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }

  const { promise, actions, ...rest } = action;
  // if the action object does not contain a promise
  // property then we can assume it's a standard action
  // so pass it on to the next middleware
  if (!promise) {
    return next(action);
  }
  
  // fetch does not support passing a params object
  // so build the queryString here and append to the url
  if (promise.params) {
    queryString = Object.keys(promise.params).map(function(key) {
      return [key, promise.params[key]].map(encodeURIComponent).join("=");
    }).join("&");
    queryString = `?${queryString}`;
  }

  const promiseUrl = promise.url + queryString;
         
  const [REQUEST, SUCCESS, FAILURE] = actions;
  // dispatch the request action
  next({ ...rest, type: REQUEST });
  // so here if there's a command line flag in place
  // allow a class to be instantiated here which starts up fetch mock
  // const mockFetch = new fetchMockProxy();
  const actionPromise = fetch(promiseUrl, promise);
  actionPromise
    .then((response) =>  response.json())
    .then(json => next({ ...rest, json, type: SUCCESS }))
    .catch(error => next({ ...rest, error, type: FAILURE }));

    return actionPromise;
};

export default fetchMiddleware
