import * as types from '../../constants/ActionTypes.js'

export function playQueue(state = [], action) {
  switch (action.type) {
    case types.ADD_TRACKS_TO_PLAY_QUEUE:
      return state.concat(action.tracks);
    case types.REPLACE_QUEUE_WITH_TRACKS:
      return [].concat(action.tracks);
    case types.REMOVE_TRACK_FROM_PLAY_QUEUE:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
      return state;
    default: 
      return state
  }    
}

export function playQueueCurrentIndex(state = 0, action) {
  switch(action.type) {
    case types.RESET_PLAY_QUEUE_INDEX:
      return 0;
    case types.INCREMENT_CURRENT_INDEX:
      return state + 1;
    case types.DECREMENT_CURRENT_INDEX:
      return state - 1;
    case types.SET_CURRENT_INDEX:
      return action.index;
    default:
      return state;
  }
}
