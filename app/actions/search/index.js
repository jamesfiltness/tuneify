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

export function fetchArtistData(searchTerm, type, limit = 3) {
  const actions =
    [
      types.LAST_FM_API_REQUEST,
      types[`RECEIVE_${type}_ARTIST_DATA`],
      types[`RECEIVE_${type}_ARTIST_DATA_ERROR`]
    ];

  const params = {
    method: 'artist.search',
    artist: searchTerm,
    limit: limit,
  };

  return fetchLastFmData(actions, params);
};

// TODO: Add error actions here!
export function fetchAlbumData(searchTerm, type, limit = 3) {
  const actions =
    [
      types.LAST_FM_API_REQUEST,
      types[`RECEIVE_${type}_ALBUM_DATA`],
      types[`RECEIVE_${type}_ALBUM_DATA_ERROR`]
    ];

  const params = {
    method: 'album.search',
    album: searchTerm,
    limit: limit,
  };

  return fetchLastFmData(actions, params);
};

export function fetchTrackData(searchTerm, type, limit = 3) {
  const actions =
    [
      types.LAST_FM_API_REQUEST,
      types[`RECEIVE_${type}_TRACK_DATA`],
      types[`RECEIVE_${type}_TRACK_DATA_ERROR`]
    ];

  const params = {
    method: 'track.search',
    track: searchTerm,
    limit: limit,
  };

  return fetchLastFmData(actions, params);
};

export function initialisingSearch(searchTerm) {
  return {
    type: types.INITIALISING_SEARCH,
    searchTerm,
  }
};

export function searchPerformed(searchTerm) {
  return dispatch => {
    if (searchTerm.length > 1) {
      dispatch(initialisingSearch(searchTerm));
      dispatch(fetchArtistData(searchTerm, 'AUTOCOMPLETE'));
      dispatch(fetchTrackData(searchTerm, 'AUTOCOMPLETE'));
      dispatch(fetchAlbumData(searchTerm, 'AUTOCOMPLETE'));
    } else {
      dispatch(clearSearch())
    }
  }
};
