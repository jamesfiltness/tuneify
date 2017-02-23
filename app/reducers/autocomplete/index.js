import * as types from '../../constants/ActionTypes.js';
import { combineReducers } from 'redux';

export function autocompleteArtistData(state = [] , action) {
  switch (action.type) {
    case types.RECEIVE_AUTOCOMPLETE_ARTIST_DATA:
      //we always want a fresh set of results returned to the state
      const results = [];
      const artists =
      action
        .json
        .results
        .artistmatches.artist.map(child => child);
      return results.concat(artists);
    case types.RECEIVE_AUTOCOMPLETE_ARTIST_DATA_ERROR:
    case types.CLEAR_SEARCH:
      return []
    default:
      return state
  }
}

export function autocompleteTrackData(state = [] , action) {
  switch (action.type) {
    case types.RECEIVE_AUTOCOMPLETE_TRACK_DATA:
      //we always want a fresh set of results returned to the state
      const results = [];
      const tracks =
      action
        .json
        .results
        .trackmatches.track.map(child => child);
      return results.concat(tracks);
    case types.RECEIVE_AUTOCOMPLETE_TRACK_DATA_ERROR:
    case types.CLEAR_SEARCH:
      return []
    default:
      return state
  }
}

export function autocompleteAlbumData(state = [] , action) {
  switch (action.type) {
    case types.RECEIVE_AUTOCOMPLETE_ALBUM_DATA:
      //we always want a fresh set of results returned to the state
      const results = [];
      const albums =
      action
        .json
        .results
        .albummatches.album.map(child => child);
      return results.concat(albums);
    case types.RECEIVE_AUTOCOMPLETE_ALBUM_DATA_ERROR:
    case types.CLEAR_SEARCH:
      return []
    default:
      return state
  }
}

export const autocomplete = combineReducers({
  autocompleteAlbumData,
  autocompleteTrackData,
  autocompleteArtistData,
});
