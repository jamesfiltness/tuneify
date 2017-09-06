import { reinitialisePlayer, playTrack } from '../../actions/play-queue';
import * as types from '../../constants/ActionTypes.js';

function setIndex(index) {
  return {
    type: types.SET_INDEX,
    index,
  }
};

const playQueueMiddleware = store => next => action => {
  if (action.type === 'PLAY_NEXT_TRACK') {
    const currentIndex = store.getState().playQueue.currentIndex;
    const playQueueLength = store.getState().playQueue.playQueueTracks.length -1;
    const playlistEnded = currentIndex >= playQueueLength;

    if (!playlistEnded) {
      store.dispatch(setIndex(currentIndex + 1));
      store.dispatch(playTrack(currentIndex + 1));
    } else {
      store.dispatch(reinitialisePlayer());
    }
  }

  if (action.type === 'REINITIALISE_PLAYER') {
    store.dispatch(setIndex(-1));
    store.dispatch(reinitialisePlayer());
  }

  next(action);
}

export default playQueueMiddleware;
