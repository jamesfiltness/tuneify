import * as types from '../../constants/ActionTypes.js'
import { fetchLastFmData, lastFmApiRequest } from '../lastfm'
import { playVideo } from '../player'

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
    // TODO: move this url out in to config
    const query = encodeURIComponent(selectedTrackString);
    return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=AIzaSyBXmXzAhx7HgpOx9jdDh6X_y5ar13WAGBE` ,{mode: 'cors'})
      .then(response => response.json())
      .then(json => { dispatch(receiveVideoData(json)) })
    }
}

export function trackSelected(selectedTrackSummaryData) {
  return {
    type: types.TRACK_SELECTED,
    selectedTrackSummaryData,
  }
}

export function playTrack(trackName, artist) {
  return (dispatch, getState)  => {
    dispatch(fetchVideoData(`${trackName} - ${artist}`)).then(() => {
      dispatch(playVideo(getState().videoData));
    });
  }
}

export function authenticate() {
  return {
    type: types.AUTHENTICATE,
    authenticate: true,
  }
}

export function showModal(modalType) {
  return {
    type: types.SHOW_MODAL,
    modalType,
  }
}
