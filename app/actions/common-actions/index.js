import * as types from '../../constants/ActionTypes.js'
import { fetchLastFmData, lastFmApiRequest } from '../lastfm-actions'
import { playVideo } from '../player-actions'

export function receiveVideoData(json) {
  return {
    type: types.RECEIVE_VIDEO_DATA,
    videoData : json.items
  }
}
// TODO: this should be moved in to youtube-data-actions directory
// TODO: this should use fetch  middleware
export function fetchVideoData(selectedTrackString) {
  return dispatch => {
    return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${selectedTrackString}&type=video&key=AIzaSyBXmXzAhx7HgpOx9jdDh6X_y5ar13WAGBE` ,{mode: 'cors'})
      .then(response => response.json())
      .then(json => { dispatch(receiveVideoData(json)) })
    }
}

export function trackSelected(selectedTrackString) {
  return {
    type: types.TRACK_SELECTED,
    selectedTrackString,
  }
}

export function playTrack(selectedTrackString) {
  return (dispatch, getState)  => {
    dispatch(trackSelected(selectedTrackString));
    dispatch(fetchVideoData(selectedTrackString)).then(() => {
      dispatch(playVideo(getState().videoData));
    });
  }
}
