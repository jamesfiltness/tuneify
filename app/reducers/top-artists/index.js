import * as types from '../../constants/ActionTypes.js';
import { combineReducers } from 'redux';

export function topArtistData(state = null, action) {
  switch (action.type) {
    case types.RECEIVE_TOP_ARTIST_DATA:
      return {
        artistData: action.json.artists.artist,
      }
    default: 
      return state
  }    
}

// TODO: these actions are not properly hooked up yet...
export function topArtistDataError(state = [], action) {
  switch(action.type) {
    case types.TOP_ARTIST__DATA_ERROR:
      return {
        error: action,
      }
    case types.CLEAR_TOP_ARTIST_ERROR:
      return null;
    default: 
      return state
  }
}

export const topArtists = combineReducers({
  topArtistData,
  topArtistDataError,
});
