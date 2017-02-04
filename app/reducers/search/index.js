import * as types from '../../constants/ActionTypes.js';
import { combineReducers } from 'redux';

export function currentSearch(state = '' , action) {
  switch (action.type) {
    case types.REQUEST_DATA:
      return  action.searchTerm
    case types.CLEAR_SEARCH:
      return  null;
    default: 
      return state
  }    
}

export function searching(state = false, action) {
  switch(action.type) {
    case types.INITIALISING_SEARCH:
      return true;
    case types.RECEIVE_TRACK_DATA:
    case types.RECEIVE_ARTIST_DATA:
    case types.RECEIVE_ALBUM_DATA:
      return false;
    default:
      return state;
  }
}

export const search = combineReducers({
  searching,
  currentSearch,
});
