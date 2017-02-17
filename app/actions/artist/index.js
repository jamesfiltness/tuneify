import * as types from '../../constants/ActionTypes.js'
import { fetchLastFmData } from '../lastfm'

export function getArtistPageData(params) {
  const actions =
    [
      types.LAST_FM_API_REQUEST,
      types.RECEIVE_ARTIST_PAGE_DATA,
      types.ARTIST_PAGE_DATA_ERROR
    ];

  const query = {
    method: 'artist.getinfo',
    ...params,
  };

  return fetchLastFmData(actions, query);
};

export function getArtistAlbums(params) {
  const actions =
    [
      types.LAST_FM_API_REQUEST,
      types.RECEIVE_ARTIST_ALBUM_DATA,
      types.ARTIST_ALBUM_DATA_ERROR
    ];

  const query = {
    method: 'artist.getTopAlbums',
    ...params,
  };

  return fetchLastFmData(actions, query);
};

export function getSimilarArtists(params) {
  const actions =
    [
      types.LAST_FM_API_REQUEST,
      types.RECEIVE_SIMILAR_ARTIST_DATA,
      types.SIMILAR_ARTIST_ERROR
    ];

  const query = {
    method: 'artist.getsimilar',
    ...params,
  };

  return fetchLastFmData(actions, query);
};

export function clearArtistPageData() {
  return {
    type: types.CLEAR_ARTIST_PAGE_DATA,
  }
};

export function clearArtistPageError() {
  return {
    type: types.CLEAR_ARTIST_PAGE_ERROR,
  }
};
