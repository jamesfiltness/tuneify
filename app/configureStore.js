import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import search from './reducers/search'

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)

export default function configureStore(initialState) {
  return createStoreWithMiddleware(search, initialState)
}