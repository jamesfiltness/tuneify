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

export function currentTrackSummaryData(state = {}, action) {
  switch (action.type) {
    case types.TRACK_SELECTED:
      return action.selectedTrackSummaryData
    case types.RECEIVE_CURRENT_TRACK_DATA:
      return {
        artist: action.json.track.artist.name,
        trackName: action.json.track.name,
        image: action.json.track.album.image[1]['#text'],
      }
    default: 
      return state
  }
}

export const search = combineReducers({

});
