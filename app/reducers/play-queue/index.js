import * as types from '../../constants/ActionTypes.js'

export function playQueue(state = [], action) {
  switch (action.type) {
    case types.ADD_TRACKS_TO_PLAY_QUEUE:
      return state.concat(action.tracks);
    case types.REPLACE_QUEUE_WITH_TRACKS:
      return [].concat(action.tracks);
    default: 
      return state
  }    
}

