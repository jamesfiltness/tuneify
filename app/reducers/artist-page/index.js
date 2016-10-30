import * as types from '../../constants/ActionTypes.js';
import { combineReducers } from 'redux';

export function artistPageData(state = null, action) {
  switch (action.type) {
    case types.RECEIVE_ARTIST_PAGE_DATA:
      // need a better solution for dealing with images here
      // what if this image is not defined
      // need to also confirm that all the required properties are here
      return {
        name: action.json.artist.name,
        bio: action.json.artist.bio,
        image: action.json.artist.image[2]['#text'],
        similar: action.json.artist.similar.artist,
      }
    case types.CLEAR_ARTIST_PAGE_DATA: 
      return null;
    default: 
      return state
  }    
}

export function currentArtistPageError(state = [], action) {
  switch(action.type) {
    case types.ARTIST_PAGE_DATA_ERROR:
      return {
        error: action,
      }
    case types.CLEAR_ARTIST_PAGE_ERROR:
      return null;
    default: 
      return state
  }
}


export const artistPage = combineReducers({
  artistPageData,
  currentArtistPageError,
});
