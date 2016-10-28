import * as types from '../../constants/ActionTypes.js'

export function playQueue(state = [], action) {
  switch (action.type) {
    case types.ADD_TRACKS_TO_PLAY_QUEUE:
      return state.concat(action.tracks);
    case types.REPLACE_QUEUE_WITH_TRACKS:
      return [].concat(action.tracks);
    case types.REMOVE_TRACK_FROM_PLAY_QUEUE:
      const trackName = action.track.name;
      const trackArtist = action.track.artist.name;
      const trackQueueIndex = state.findIndex(track => {
        return track.name == trackName && track.artist.name === trackArtist;
      });
      return [
        ...state.slice(0, trackQueueIndex),
        ...state.slice(trackQueueIndex + 1)
      ]
      return state;
    default: 
      return state
  }    
}

