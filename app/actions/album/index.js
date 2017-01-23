LOCK YOUR COMPUTER NEXT TIME!!!


import * as types from '../../constants/ActionTypes.js';
import { fetchLastFmData, lastFmApiRequest } from '../lastfm';
import { resetPlayQueueIndex, playCurrentIndex } from '../play-queue';
import { setCurrentIndex } from '../play-queue';

const prepareTrackData = (trackArr, img) => {
  return trackArr.map((track) => {
    console.log(track);
    return {
      name: track.name,
      artist: track.artist.name,
      image: img
    }
  });
}

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

export function appendAlbumToPlayQueue(tracks, img) {
  const trackData = prepareTrackData(tracks, img);
  return {
    type: types.ADD_TRACKS_TO_PLAY_QUEUE,
    trackData,
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

export function appendTrackToPlayQueueAndPlay(track, img) {
  return (dispatch, getState) => {
    const trackObj = prepareTrackData([track], img);

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

export function replaceQueueWithTracks(tracks, img) {
  const trackData = prepareTrackData(tracks, img);
  return {
    type: types.REPLACE_QUEUE_WITH_TRACKS,
    trackData,
  }
}

export function replaceQueueWithAlbumAndPlay(tracks, img) {
  return (dispatch, getState)  => {
    dispatch(replaceQueueWithTracks(tracks, img));
    dispatch(resetPlayQueueIndex());
    dispatch(playCurrentIndex());
  }
}
