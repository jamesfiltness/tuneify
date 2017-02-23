import * as types from '../../constants/ActionTypes.js';
import { combineReducers } from 'redux';

export function artistData(state = [] , action) {
  switch (action.type) {
    case types.RECEIVE_FULL_ARTIST_DATA:
      //we always want a fresh set of results returned to the state
      const results = [];
      const artists =
      action
        .json
        .results
        .artistmatches.artist.map(child => child);
      return results.concat(artists);
    case types.CLEAR_SEARCH_PAGE:
    case types.CLEAR_FULL_SEARCH_RESULTS:
    case types.RECEIVE_FULL_ARTIST_DATA_ERROR:
      return []
    default:
      return state
  }
}

export function trackData(state = [] , action) {
  switch (action.type) {
    case types.RECEIVE_FULL_TRACK_DATA:
      //we always want a fresh set of results returned to the state
      const results = [];
      const tracks =
      action
        .json
        .results
        .trackmatches.track.map(child => child);
      return results.concat(tracks);
    case types.CLEAR_SEARCH_PAGE:
    case types.CLEAR_FULL_SEARCH_RESULTS:
    case types.RECEIVE_FULL_TRACK_DATA_ERROR:
      return []
    default:
      return state
  }
}

export function albumData(state = [] , action) {
  switch (action.type) {
    case types.RECEIVE_FULL_ALBUM_DATA:
      //we always want a fresh set of results returned to the state
      const results = [];
      const albums =
      action
        .json
        .results
        .albummatches.album.map(child => child);
      return results.concat(albums);
    case types.CLEAR_SEARCH_PAGE:
    case types.CLEAR_FULL_SEARCH_RESULTS:
    case types.RECEIVE_FULL_ALBUM_DATA_ERROR:
      return []
    default:
      return state
  }
}

export const searchResults = combineReducers({
  albumData,
  trackData,
  artistData,
});
