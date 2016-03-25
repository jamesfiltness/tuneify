import { combineReducers } from 'redux'
import { CUE_VIDEO } from '../constants/Actiontypes'

const initialState = {
  currentVideo : null,
  playing: false
};

export function currentVideo(state = '' , action) {
	console.log('vi',state);
    switch (action.type) {
        case CUE_VIDEO:
            return  action.videoId
        default: 
            return state
    }    
}