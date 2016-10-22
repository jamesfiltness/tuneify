import * as types from '../../constants/ActionTypes.js'

export function albumPage(state = null, action) {
  switch (action.type) {
    case types.RECEIVE_ALBUM_PAGE_DATA:
      // need a better solution for dealing with images here
      // what if this image is not defined
      // need to also confirm that all the required properties are here
      if(action.json.album.tracks.track.length === 0) {
        return {
          error: "JSON response empty",
        }
      }

      return {
        artist: action.json.album.artist,
        tracks: action.json.album.tracks.track,
        name: action.json.album.name,
        image: action.json.album.image[2]['#text'],
      }
    case types.CLEAR_ALBUM_PAGE_DATA: 
      return null;
    default: 
      return state
  }    
}

export function currentAlbumPageError(state = [], action) {
  switch(action.type) {
    case types.ALBUM_PAGE_DATA_ERROR:
      return {
        error: action,
      }
    case types.CLEAR_ALBUM_PAGE_ERROR:
    console.log('clearing errors');
      return null;
    default: 
      return state
  }
}
