import { combineReducers } from 'redux'
import { RECEIVE_ARTIST_DATA,RECEIVE_TRACK_DATA,RECEIVE_ALBUM_DATA, REQUEST_DATA, CLEAR_SEARCH } from '../actions/SearchActions'

const initialState = {
  currentSearch: null,
  currentArtistResults: [],
  currentTrackResults: [],
  currentAlbumResults: [],
  autoCompleteVisible: false
};

function currentSearch(state = '' , action) {
    switch (action.type) {
        case REQUEST_DATA:
            return  action.searchTerm
        case CLEAR_SEARCH:
            return  null;
        default: 
            return state
    }    
}

function currentArtistResults(state = [] , action) {
    switch (action.type) {
        case RECEIVE_ARTIST_DATA:
            //we always want a fresh set of results returned to the state
            var results = [];
            return results.concat(action.artists);
        case CLEAR_SEARCH: 
            return []

         default: 
             return state
      }
}

function currentTrackResults(state = [] , action) {
    switch (action.type) {
        case RECEIVE_TRACK_DATA:
            //we always want a fresh set of results returned to the state
            var results = [];
            return results.concat(action.tracks);
        case CLEAR_SEARCH: 
            return []

         default: 
             return state
      }
}

function currentAlbumResults(state = [] , action) {
    switch (action.type) {
        case RECEIVE_ALBUM_DATA:
            //we always want a fresh set of results returned to the state
            var results = [];

            return results.concat(action.albums);

        case CLEAR_SEARCH: 
 
            return []

         default: 
             return state
      }
}

const search = combineReducers({
    currentSearch,
    currentArtistResults,
    currentTrackResults,
    currentAlbumResults
})

export default search

