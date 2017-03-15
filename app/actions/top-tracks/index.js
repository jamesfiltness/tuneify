import * as types from '../../constants/ActionTypes.js'
import { fetchLastFmData } from '../lastfm';
import { addTrackToQueueAndPlay } from '../play-queue';

export function getTopTracks() {
  const actions =
    [
      types.LAST_FM_API_REQUEST,
      types.RECEIVE_TOP_TRACK_DATA,
      types.TOP_TRACK_DATA_ERROR
    ];

  const params = {
    method: 'chart.gettoptracks',
  };

  return fetchLastFmData(actions, params);
}

export function playTopTrack(name, artist, image) {
  return (dispatch, getState)  => {
    dispatch(
      addTrackToQueueAndPlay(
        {
          name,
          artist,
        },
        image,
      )
    );
  }
}
