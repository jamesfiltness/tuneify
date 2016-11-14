import * as types from '../../constants/ActionTypes.js';
import { 
  playTrack, 
  getTrackInfo, 
  trackSelected, 
} from '../common-actions';

export function playQueueTrackSelected(selectedTrackData, index) {
  return (dispatch, getState)  => {
    const trackName = selectedTrackData.name;
    const artist = selectedTrackData.artist.name;

    // if user is selecting a result from the play queue then there 
    // isn't an image because the play queue is retrieved form the album.getInfo
    // lastfm endpoint which doesn't include images in the response
    // so make another call to get the image for the CurrentTrackSummary
    // component
    dispatch(getTrackInfo(trackName, artist));
    dispatch(setCurrentIndex(index));
    dispatch(
      playTrack(
        selectedTrackData.name, 
        selectedTrackData.artist.name,
      )
    );
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

export function playRepeatedTrack() {
  return(dispatch, getState) => {
    const currentIndex = getState().playQueue.playQueueCurrentIndex;
    dispatch(setCurrentIndex(currentIndex));
  }
}

export function incrementCurrentIndex() {
  return (dispatch, getState) => {
    if(getState().playQueue.shuffle) {
      dispatch(playRandomIndex());
    } else if(getState().playQueue.repeat) {
      dispatch(playRepeatedTrack());
    } else {
      dispatch({
        type: types.INCREMENT_CURRENT_INDEX,
      });
    }
  }
}
export function setCurrentIndex(index) {
  return {
    type: types.SET_CURRENT_INDEX,
    index,
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
    
    dispatch(
      getTrackInfo(
        currentTrack.name, 
        currentTrack.artist.name
      )
    );

    dispatch(
      playTrack(
        currentTrack.name, 
        currentTrack.artist.name
      )
    );
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

