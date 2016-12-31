import * as types from '../../constants/ActionTypes.js';
import { fetchLastFmData, lastFmApiRequest } from '../lastfm';
import { resetPlayQueueIndex, playCurrentIndex } from '../play-queue';
import { setCurrentIndex } from '../play-queue';

export function getAlbumPageData(params) {
  const actions = [
    types.LAST_FM_API_REQUEST, 
    types.RECEIVE_ALBUM_PAGE_DATA,
    types.ALBUM_PAGE_DATA_ERROR
  ];
  
  const query = { 
    method: 'album.getinfo',
    ...params,
  };
  
  return fetchLastFmData(actions, query);
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

export function appendTrackToPlayQueue(track) {
  return {
    type: types.APPEND_TRACK_TO_PLAY_QUEUE,
    track
  }
}

const appendTrack = (track, dispatch) => new Promise((resolve, reject) => {
  dispatch(appendTrackToPlayQueue(track));
  resolve();
});

export function appendTrackToPlayQueueAndPlay(track) {
  return (dispatch, getState) => {
    let trackObj = track;
    
    // This is a hack - in most cases the artist is in track.artist.name
    // but in some cases it's nested at the root level track.artist
    if (!trackObj.artist.name) {
      trackObj = { ...track, ...{ artist: { name: track.artist, mbid: track.mbid } } };
    }
    
    appendTrack(trackObj, dispatch).then(() => {
      dispatch(
        setCurrentIndex(
          getState().playQueue.playQueueTracks.length - 1
        )
      )
      dispatch(playCurrentIndex());
    })
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
