import * as types from '../../constants/ActionTypes.js';
import { playTrack, getTrackInfo, trackSelected } from '../common-actions';

export function playQueueTrackSelected(selectedTrackData) {
  return (dispatch, getState)  => {
    const trackName = selectedTrackData.name;
    const artist = selectedTrackData.artist.name;

    // if user is selecting a result from the play queue then there 
    // isn't an image because the play queue is retrieved form the album.getInfo
    // lastfm endpoint which doesn't include images in the response
    // so make another call to get the image for the CurrentTrackSummary
    // component
    dispatch(getTrackInfo(trackName, artist));
    dispatch(
      playTrack(
        selectedTrackData.name, 
        selectedTrackData.artist.name,
      )
    );
  }
}


export function removeTrackFromQueue(track) {
  return {
    type: types.REMOVE_TRACK_FROM_PLAY_QUEUE,
    track,
  }
}
