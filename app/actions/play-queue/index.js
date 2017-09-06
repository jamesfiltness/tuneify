import * as types from '../../constants/ActionTypes.js';
import { fetchVideoDataAndPlay, reinitialisePlayer } from '../player';
import { showModal } from '../modal';
import { authenticate } from '../auth';
import prepareTrackData from '../../utils/prepare-track-data';

const appendTrackToQueue = (track, img,  dispatch) => new Promise((resolve, reject) => {
  dispatch(appendTrackToPlayQueue(track, img));
  resolve();
});

const randomIndex = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min)) + min;
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

export function appendTrackToPlayQueue(track, img) {
  const trackObj = prepareTrackData([track], img);
  return {
    type: types.APPEND_TRACK_TO_PLAY_QUEUE,
    trackObj
  }
}

export function savePlayList() {
  return (dispatch, getState) => {
    if (getState().playQueue.playQueueTracks.length) {
      dispatch(showModal('savePlaylist'))
    }
  }
}

export function createPlaylist() {
  return (dispatch, getState) => {
    if (!getState().authenticated) {
      dispatch(authenticate());
    }
    dispatch(showModal('createPlaylist'))
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

export function replaceQueueWithTracks(tracks, img) {
  const trackData = prepareTrackData(tracks, img);
  return {
    type: types.REPLACE_QUEUE_WITH_TRACKS,
    trackData,
  }
}

export function appendTracksToPlayQueue(tracks, img) {
  const trackData = prepareTrackData(tracks, img);
  return {
    type: types.ADD_TRACKS_TO_PLAY_QUEUE,
    trackData,
  }
}

export function replaceQueueWithTracksAndPlay(tracks, img) {
  console.log(tracks);
  return (dispatch, getState)  => {
    dispatch(replaceQueueWithTracks(tracks, img));
    dispatch(resetPlayQueueIndex());
    dispatch(playNextTrack());
  }
}

export function playTrack(index) {
  return (dispatch, getState)  => {
    const currentTrackData = getState().playQueue.playQueueTracks[index];
    dispatch(
      fetchVideoDataAndPlay(
        currentTrackData.name,
        currentTrackData.artist,
      )
    );
  }
}


export function playNextTrack() {
  return {
    type: types.PLAY_NEXT_TRACK,
  }
}

