import * as types from '../../constants/ActionTypes.js';
import { fetchLastFmData } from '../lastfm';

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
