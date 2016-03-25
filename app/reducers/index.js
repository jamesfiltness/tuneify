import { combineReducers } from 'redux'
import { currentSearch, currentArtistResults, currentTrackResults, currentAlbumResults } from '../reducers/search'
import { currentVideo } from '../reducers/videoPlayer'
import * as types from '../constants/Actiontypes'

const rootReducer = combineReducers({
   currentSearch,
   currentArtistResults,
   currentTrackResults,
   currentAlbumResults,
   currentVideo
})



export default rootReducer