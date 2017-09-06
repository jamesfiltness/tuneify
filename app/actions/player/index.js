import * as types from '../../constants/ActionTypes.js';
import {
  playNextTrack,
} from '../play-queue';

export function playVideo(videoData) {
  return {
    type: types.PLAY_VIDEO,
    videoData
  }
}

export function trackEnded() {
  return (dispatch, getState) => {
  }
}

export function playNext() {
  return (dispatch, getState) => {
    dispatch(playNextTrack());
  }
}

export function playPreviousTrack() {
  return (dispatch, getState) => {
  }
}

export function receiveVideoData(json) {
  return {
    type: types.RECEIVE_VIDEO_DATA,
    videoData : json.items
  }
}

export function restartedTrack() {
  return {
    type: types.RESTARTED_TRACK,
  }
}


export function pauseBySpacebar() {
  return {
    type: types.PAUSE_BY_SPACEBAR,
  }
}

export function fetchVideoData(selectedTrackString) {
  return dispatch => {
    // TODO: move this url out in to config
    const query = encodeURIComponent(selectedTrackString);
    const youtubeUrl = window.clientConfig.endpoints.youtube.url;
    const youtubeApiKey = window.clientConfig.endpoints.youtube.api_key;

    return fetch(
      `${youtubeUrl}${query}&type=video&key=${youtubeApiKey}`,
      { mode: 'cors' }
    )
    .then(response => response.json())
    .then(json => { dispatch(receiveVideoData(json)) })
  }
}

export function fetchVideoDataAndPlay(trackName, artist) {
  return (dispatch, getState)  => {
    dispatch(fetchVideoData(`${trackName} - ${artist}`)).then(() => {
      dispatch(playVideo(getState().videoData));
    });
  }
}

export function destroyPlayer() {
  return {
    type: types.DESTROY_PLAYER,
  }
}

export function playerReinitialised() {
  return {
    type: types.PLAYER_REINITIALISED,
  }
}

export function reinitialisePlayer() {
  return(dispatch) => {
   dispatch(destroyPlayer());
  }
}
