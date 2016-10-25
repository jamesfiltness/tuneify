import * as types from '../../constants/ActionTypes.js';
import { playTrack } from '../common-actions';

export function playQueueTrackSelected(selectedTrackData) {
  return (dispatch, getState)  => {
    dispatch(playTrack(selectedTrackData));
  }
};
