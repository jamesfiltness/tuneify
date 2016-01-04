import { combineReducers } from 'redux'
import search from '../reducers/search'
import videoPlayer from '../reducers/videoPlayer'

const rootReducer = combineReducers({
   search,
   videoPlayer
})



export default rootReducer