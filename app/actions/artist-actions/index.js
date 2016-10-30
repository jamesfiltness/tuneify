import * as types from '../../constants/ActionTypes.js'
import { fetchLastFmData, lastFmApiRequest } from '../lastfm-actions'

export function getArtistPageData(mbid) {
  const actions =  
    [
      types.LAST_FM_API_REQUEST, 
      types.RECEIVE_ARTIST_PAGE_DATA,
      types.ARTIST_PAGE_DATA_ERROR
    ];

  const params = { 
    method: 'artist.getinfo',
    mbid,
  };
  
  return fetchLastFmData(actions, params);
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
