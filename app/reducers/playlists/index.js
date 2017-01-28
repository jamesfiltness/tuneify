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

export function creatingUserPlaylist(state = false, action) {
  switch (action.type) {
    case types.CREATE_PLAYLIST:
      return true;
    case types.PLAYLIST_CREATED:
    case types.PLAYLIST_CREATE_ERROR:
      return false;
    default: 
      return state;
  }
}

export function userPlaylists(state = [], action) {
  switch (action.type) {
    case types.RECEIVE_USER_PLAYLIST_DATA:
      return action.json.data.Items.map((item) => {
        return {
          ...item,
          tracks: JSON.parse(item.tracks),
        }      
      })
    case types.PLAYLIST_CREATED:
     const newPlaylist = action.json;
     
     return [ 
       ...state, 
       {
         ...newPlaylist,
         tracks: JSON.parse(action.json.tracks), 
       }
     ];
     
    case types.USER_PLAYLIST_REQUEST_ERROR:
    case types.LOGGED_OUT:
      return []
    default: 
      return state
  }
}

export const playlists = combineReducers({
  requestingUserPlaylists,
  userPlaylists,
  creatingUserPlaylist,
});
