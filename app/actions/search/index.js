require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import * as types from '../../constants/ActionTypes.js';
import { addTrackToQueueAndPlay } from '../play-queue';
import { fetchLastFmData } from '../lastfm';

export function clearSearch() {
  return {
    type: types.CLEAR_SEARCH
  }
};

export function autocompleteTrackSelected(selectedTrackData) {
  return (dispatch, getState)  => {
    dispatch(
      addTrackToQueueAndPlay(
        { 
          name: selectedTrackData.name,
          artist: selectedTrackData.artist,
        },
        selectedTrackData.image[2]['#text'],
      )
    );
  }
};

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

// TODO: Add error actions here!
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

export function initialisingSearch() {
  return {
    type: types.INITIALISING_SEARCH,
  }
};

export function searchPerformed(searchTerm) {
  return dispatch => {
    if(searchTerm.length > 1) {
      dispatch(initialisingSearch());
      dispatch(fetchArtistData(searchTerm));
      dispatch(fetchTrackData(searchTerm));
      dispatch(fetchAlbumData(searchTerm));
    } else {
      dispatch(clearSearch())
    }
  }
};
