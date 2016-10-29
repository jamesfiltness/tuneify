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
    // TODO: move this url out in to config
    return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${selectedTrackString}&type=video&key=AIzaSyBXmXzAhx7HgpOx9jdDh6X_y5ar13WAGBE` ,{mode: 'cors'})
      .then(response => response.json())
      .then(json => { dispatch(receiveVideoData(json)) })
    }
}

export function trackSelected(selectedTrackSummaryData, from) {
  return {
    type: types.TRACK_SELECTED,
    selectedTrackSummaryData,
  }
}

export function getTrackInfo(track, artist) {
  const actions =  
    [
      types.LAST_FM_API_REQUEST, 
      types.RECEIVE_CURRENT_TRACK_DATA,
      types.RECEIVE_ARTIST_DATA
    ];

  const params = { 
    method: 'track.getInfo',
    artist,
    track,
  };

  return fetchLastFmData(actions, params);
};

export function playTrack(trackName, artist) {
  return (dispatch, getState)  => {
    dispatch(fetchVideoData(`${trackName} - ${artist}`)).then(() => {
      dispatch(playVideo(getState().videoData));
    });
  }
}
