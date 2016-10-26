import * as types from '../../constants/ActionTypes.js';
import { playTrack } from '../common-actions';

export function playQueueTrackSelected(selectedTrackData) {
  return (dispatch, getState)  => {
    const selectedTrackString = `${selectedTrackData.name} - ${selectedTrackData.artist.name}`;
    dispatch(playTrack(selectedTrackString));
  }
};

export function removeTrackFromQueue(track) {
  return {
    type: types.REMOVE_TRACK_FROM_PLAY_QUEUE,
    track,
  }
}
