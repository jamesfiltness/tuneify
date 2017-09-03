import * as types from '../../constants/ActionTypes.js'
import { combineReducers } from 'redux';

export function playQueueTracks(state = [], action) {
  switch (action.type) {
    case types.APPEND_TRACK_TO_PLAY_QUEUE:
      return state.concat(action.trackObj);
    case types.ADD_TRACKS_TO_PLAY_QUEUE:
      return state.concat(action.trackData);
    case types.REPLACE_QUEUE_WITH_TRACKS:
      return [].concat(action.trackData);
    case types.REMOVE_TRACK_FROM_PLAY_QUEUE:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
      return state;
    case types.TRASH_PLAY_QUEUE:
      return []
    default:
      return state
  }
}

export function currentIndex(state = -1, action) {
  switch(action.type) {
    case types.RESET_PLAY_QUEUE_INDEX:
      return -1
    case types.SET_INDEX:
      return action.index
    default:
      return state;
  }
}

export function shuffle(state = false, action) {
  switch(action.type) {
    case types.SHUFFLE:
      return action.enabled;
    default:
      return state;
  }
}

export function repeat(state = false, action) {
  switch(action.type) {
    case types.REPEAT:
      return action.enabled;
    default:
      return state;
  }
}

export function savePlaylistPopupVisible(state = false, action) {
  switch(action.type) {
    case types.SHOW_SAVE_PLAYLIST_POPUP:
      return true;
    case types.HIDE_SAVE_PLAYLIST_POPUP:
      return false;
    default:
      return state;
  }
}

export function destroyPlayer(state = false, action) {
  switch(action.type) {
    case types.DESTROY_PLAYER:
      return true;
    case types.PLAYER_REINITIALISED:
      return false;
    default:
      return state;
  }
}


export const playQueue = combineReducers({
  playQueueTracks,
  shuffle,
  repeat,
  currentIndex,
  savePlaylistPopupVisible,
  destroyPlayer,
});
