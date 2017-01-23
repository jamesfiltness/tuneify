import * as types from '../../constants/ActionTypes.js';
import { 
  playTrack, 
  trackSelected,
  authenticate,
  showModal,
} from '../common';

export function playQueueTrackSelected(selectedTrackData, index) {
  return (dispatch, getState)  => {
    dispatch(setCurrentIndex(index));
    dispatch(trackSelected(currentTrack));
    dispatch(
      playTrack(
        selectedTrackData.name, 
        selectedTrackData.artist,
      )
    );
  }
}

export function savePlayList() {
  return (dispatch, getState) => {
    if (!getState().authenticated) {
      dispatch(authenticate());   
    }
    dispatch(showModal('savePlaylist'))
  }
}


function randomIndex(max, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function playRandomIndex() {
  return(dispatch, getState) => {
    const playQueueLength = getState().playQueue.playQueueTracks.length;
    const randomTrackIndex = randomIndex(playQueueLength);
    dispatch(setCurrentIndex(randomTrackIndex));
  }
}

export function incrementCurrentIndex() {
  return (dispatch, getState) => {
    const playQueue = getState().playQueue;
    if(playQueue.shuffle) {
      dispatch(playRandomIndex());
    } 
    
    else if(
        playQueue.playQueueTracks.length -1  === playQueue.playQueueCurrentIndex
      ) {
        if (playQueue.repeat) {
          // if repeat is enabled and we're on the last track
          // play the play queue from the beginning again
          dispatch(setCurrentIndex(0));
        } else {
          return;
        }
    } else {
      dispatch({
        type: types.INCREMENT_CURRENT_INDEX,
      });
    }
  }
}

export function decrementCurrentIndex() {
  return (dispatch, getState) => {
    if(getState().playQueue.shuffle) {
      dispatch(playRandomIndex());
    } else {
      dispatch({
        type: types.DECREMENT_CURRENT_INDEX,
      });
    }
  }
}

export function playCurrentIndex() {
  return (dispatch, getState) => {
    const currentIndex = getState().playQueue.playQueueCurrentIndex;
    const currentTrack = getState().playQueue.playQueueTracks[currentIndex];
    dispatch(trackSelected(currentTrack));

    dispatch(
      playTrack(
        currentTrack.name, 
        currentTrack.artist
      )
    );
  }
}

export function shuffle() {
  return (dispatch, getState) => {
    dispatch(toggleRepeat(false));
    dispatch(toggleShuffle(!getState().playQueue.shuffle));
  }
}

export function repeat() {
  return (dispatch, getState) => {
    dispatch(toggleShuffle(false));
    dispatch(toggleRepeat(!getState().playQueue.repeat));
  }
}

export function toggleShuffle(on) {
  return {
    type: types.SHUFFLE,
    enabled: on,
  }
}

export function toggleRepeat(on) {
  return {
    type: types.REPEAT,
    enabled: on,
  }
}

export function resetPlayQueueIndex() {
  return {
    type: types.RESET_PLAY_QUEUE_INDEX,
  }
}

export function removeTrackFromQueue(index) {
  return {
    type: types.REMOVE_TRACK_FROM_PLAY_QUEUE,
    index,
  }
}

export function trashPlayQueue() {
  return {
    type: types.TRASH_PLAY_QUEUE,
  }
}

export function setCurrentIndex(index) {
  return {
    type: types.SET_CURRENT_INDEX,
    index,
  }
}

