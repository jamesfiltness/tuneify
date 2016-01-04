import { combineReducers } from 'redux'
import { CUE_VIDEO } from '../actions/PlayerActions'

const initialState = {
  currentVideo : null,
  playing: false
};

function currentVideo(state = '' , action) {
    switch (action.type) {
        case CUE_VIDEO:
            return  action.videoId
        default: 
            return state
    }    
}

const videoPlayer = combineReducers({
  currentVideo
})

export default videoPlayer