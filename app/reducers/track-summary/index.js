import * as types from '../../constants/ActionTypes.js';

export function currentTrackSummaryData(state = {}, action) {
  switch (action.type) {
    case types.TRACK_SELECTED:
      return action.selectedTrackSummaryData
    default: 
      return state
  }
}
