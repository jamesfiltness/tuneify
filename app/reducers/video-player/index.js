import { PLAY_VIDEO } from '../../constants/ActionTypes.js'

export function currentVideo(state = '' , action) {
  switch (action.type) {
    case PLAY_VIDEO:
      return  action.videoData[0]
    default: 
      return state
  }    
}
