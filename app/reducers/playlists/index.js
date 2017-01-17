import * as types from '../../constants/ActionTypes.js';
import { combineReducers } from 'redux';

export function requestingUserPlaylists(state = false, action) {
  switch (action.type) {
    case types.REQUEST_USER_PLAYLISTS:
      return true;
    case types.RECEIVE_USER_PLAYLISTS:
      return false;
    case types.USER_PLAYLIST_REQUEST_ERROR:
      return false;
    default: 
      return false 
  }    
}

export function userPlaylists(state = {}, action) {
  switch (action.type) {
    case types.RECEIVE_USER_PLAYLIST_DATA:
      return action
        .json
        .data
        .Items;
    case types.USER_PLAYLIST_REQUEST_ERROR:
      return {}
    default: 
      return state
  }
}

export const playlists = combineReducers({
  requestingUserPlaylists,
  userPlaylists
});
