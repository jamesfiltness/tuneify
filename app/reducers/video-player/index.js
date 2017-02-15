import * as types from '../../constants/ActionTypes.js';
import { combineReducers } from 'redux';

export function currentVideo(state = '' , action) {
  switch (action.type) {
    case types.PLAY_VIDEO:
      return action.videoData[0];
    default:
      return state;
  }
}

export function restartCurrentTrack(state = false, action) {
  switch (action.type) {
    case types.RESTART_TRACK:
      return true;
    case types.RESTARTED_TRACK:
      return false;
    default:
      return state;
  }
}

export const videoPlayer = combineReducers({
  currentVideo,
  restartCurrentTrack,
});

