import * as types from '../../constants/ActionTypes.js'

export function topArtistData(state = null, action) {
  switch (action.type) {
    case types.RECEIVE_TOP_ARTIST_DATA:
      return {
        artistData: action.json.artists.artist,
      }
    default: 
      return state
  }    
}

export function topArtistDataError(state = [], action) {
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
