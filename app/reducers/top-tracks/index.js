import * as types from '../../constants/ActionTypes.js';
import { combineReducers } from 'redux';

export function topTrackData(state = null, action) {
  switch (action.type) {
    case types.RECEIVE_TOP_TRACK_DATA:
      return {
        trackData: action.json.tracks.track,
      }
    default:
      return state
  }
}

// TODO: these actions are not properly hooked up yet...
export function topTrackDataError(state = null, action) {
  switch(action.type) {
    case types.TOP_TRACK_DATA_ERROR:
      return {
        error: action,
      }
    case types.CLEAR_TOP_TRACK_ERROR:
      return null;
    default:
      return state
  }
}

export const topTracks = combineReducers({
  topTrackData,
  topTrackDataError,
});
