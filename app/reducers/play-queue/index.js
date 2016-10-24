import * as types from '../../constants/ActionTypes.js'

export function playQueue(state = [], action) {
  switch (action.type) {
    case types.ADD_TRACKS_TO_PLAY_QUEUE:
      const playQueue = state.playQueue;
      return playQueue.concat(action.tracks);
    default: 
      return state
  }    
}

