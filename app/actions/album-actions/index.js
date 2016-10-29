import * as types from '../../constants/ActionTypes.js'
import { fetchLastFmData, lastFmApiRequest } from '../lastfm-actions'
import { resetPlayQueueIndex, playCurrentIndex } from '../play-queue';

export function getAlbumPageData(album, artist) {
  const actions =  
    [
      types.LAST_FM_API_REQUEST, 
      types.RECEIVE_ALBUM_PAGE_DATA,
      types.ALBUM_PAGE_DATA_ERROR
    ];

  const params = { 
    method: 'album.getinfo',
    album,
    artist,
  };
  
  return fetchLastFmData(actions, params);
}

export function clearAlbumPageData() {
  return {
    type: types.CLEAR_ALBUM_PAGE_DATA,
  }
}

export function clearAlbumPageError() {
  return {
    type: types.CLEAR_ALBUM_PAGE_ERROR,
  }
}

export function appendAlbumToPlayQueue(tracks) {
  return {
    type: types.ADD_TRACKS_TO_PLAY_QUEUE,
    tracks,
  }
}

export function replaceQueueWithTracks(tracks) {
  return {
    type: types.REPLACE_QUEUE_WITH_TRACKS,
    tracks,
  }
}

export function replaceQueueWithAlbumAndPlay(tracks) {
  return (dispatch, getState)  => {
    dispatch(replaceQueueWithTracks(tracks));
    dispatch(resetPlayQueueIndex());
    dispatch(playCurrentIndex());
  }
}
