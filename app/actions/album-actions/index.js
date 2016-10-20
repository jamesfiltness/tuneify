import * as types from '../../constants/ActionTypes.js'
import { handleErrors, handleServerErrors } from '../../utils/handleErrors'
import { fetchLastFmData,  lastFmApiRequest } from '../lastfm-actions'

export function getAlbumPageData(album, artist) {
  const actions =  
    [
      types.LAST_FM_API_REQUEST, 
      types.RECEIVE_ALBUM_PAGE_DATA,
      types.ALBUM_PAGE_DATA_ERROR
    ];

  const params = { 
    method: 'album.getinfo',
    album : album,
    artist: artist,
  };
  
  return fetchLastFmData(actions, params);
}

export function clearAlbumPageData() {
  return {
    type: types.CLEAR_ALBUM_PAGE_DATA,
  }
};

export function clearAlbumPageError() {
  return {
    type: types.CLEAR_ALBUM_PAGE_ERROR,
  }
}

