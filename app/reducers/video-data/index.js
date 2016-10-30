import * as types from '../../constants/ActionTypes.js';

export function videoData(state = [], action) {
  switch(action.type) {
    case types.RECEIVE_VIDEO_DATA:
    const results = [];
    return results.concat(action.videoData);
    default: return state
  }
}
