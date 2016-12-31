import * as types from '../../constants/ActionTypes.js'
import { fetchLastFmData, lastFmApiRequest } from '../lastfm'

export function getTopArtists() {
  const actions =  
    [
      types.LAST_FM_API_REQUEST, 
      types.RECEIVE_TOP_ARTIST_DATA,
      types.TOP_ARTIST_DATA_ERROR
    ];

  const params = { 
    method: 'chart.gettopartists',
  };
  
  return fetchLastFmData(actions, params);
}

