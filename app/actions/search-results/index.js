import * as types from '../../constants/ActionTypes.js';
import { addTrackToQueueAndPlay } from '../play-queue';

// TODO these three action creators could be rolled in to one that accepts
// a param
import {
  fetchArtistData,
  fetchTrackData,
  fetchAlbumData,
} from '../search';

export function clearFullSearchResults() {
  return {
    type: types.CLEAR_FULL_SEARCH_RESULTS,
  }
}

export function getFullSearchResults(searchTerm) {
  return dispatch => {
    const limit = 30;
    dispatch(clearFullSearchResults());
    dispatch(fetchArtistData(searchTerm, 'FULL', limit));
    dispatch(fetchTrackData(searchTerm,  'FULL', limit));
    dispatch(fetchAlbumData(searchTerm, 'FULL', limit));
  }
}

export function searchResultTrackSelected(track) {
  return (dispatch, getState)  => {
    dispatch(
      addTrackToQueueAndPlay(
        {
          name: track.name,
          artist: track.artist,
        },
        track.image[2]['#text'],
      )
    );
  }
}
