import { CUE_VIDEO } from '../../constants/ActionTypes.js'

const initialState = {
  currentVideo : null,
  playing: false
};

export function currentVideo(state = '' , action) {
    switch (action.type) {
        case CUE_VIDEO:
            return  action.videoId
        default: 
            return state
    }    
}
