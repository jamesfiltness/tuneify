require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import * as types from '../../constants/ActionTypes.js';
import { playVideo } from '../player';
import { playTrack, trackSelected } from '../common';
import { appendTrackToPlayQueueAndPlay } from '../album';
import { fetchLastFmData } from '../lastfm';

export function clearSearch() {
  return {
    type: types.CLEAR_SEARCH
  }
};

export function autocompleteTrackSelected(selectedTrackData) {
  return (dispatch, getState)  => {
    dispatch(
      appendTrackToPlayQueueAndPlay(
        { 
          name: selectedTrackData.name,
          artist: { name: selectedTrackData.artist },
        },
        selectedTrackData.image[1]['#text'],
      )
    );
  }
};


export function receiveVideoData(json) {
  return {
    type: types.RECEIVE_VIDEO_DATA,
    videoData : json.items
  }
}

export function fetchArtistData(searchTerm, limit = 3) {
  const actions =  
    [
      types.LAST_FM_API_REQUEST, 
      types.RECEIVE_ARTIST_DATA,
      types.RECEIVE_ARTIST_DATA
    ];

  const params = { 
    method: 'artist.search',
    artist: searchTerm,
    limit: limit,
  };

  return fetchLastFmData(actions, params);
};

export function fetchAlbumData(searchTerm, limit = 3) {
  const actions =  
    [
      types.LAST_FM_API_REQUEST, 
      types.RECEIVE_ALBUM_DATA,
      types.RECEIVE_ALBUM_DATA
    ];

  const params = { 
    method: 'album.search',
    album: searchTerm,
    limit: limit,
  };

  return fetchLastFmData(actions, params);
};

export function fetchTrackData(searchTerm, limit = 3) {
  const actions =  
    [
      types.LAST_FM_API_REQUEST, 
      types.RECEIVE_TRACK_DATA,
      types.RECEIVE_TRACK_DATA
    ];

  const params = { 
    method: 'track.search',
    track: searchTerm,
    limit: limit,
  };

  return fetchLastFmData(actions, params);
};

export function searchPerformed(searchTerm) {
  return dispatch => {
    if(searchTerm.length > 1) {
      dispatch(fetchArtistData(searchTerm));
      dispatch(fetchTrackData(searchTerm));
      dispatch(fetchAlbumData(searchTerm));
    } else {
      dispatch(clearSearch())
    }
  }
}
