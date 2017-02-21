import * as types from '../../constants/ActionTypes.js';
// TODO these three action creators could be rolled in to one that accepts
// a param
import {
  fetchArtistData,
  fetchTrackData,
  fetchAlbumData,
} from '../search';

export function getFullSearchResults(searchTerm) {
  console.log('om ne');
  return dispatch => {
    const limit = 30;

    dispatch(fetchArtistData(searchTerm, 'FULL', limit));
    dispatch(fetchTrackData(searchTerm,  'FULL', limit));
    dispatch(fetchAlbumData(searchTerm, 'FULL', limit));
  }
}
