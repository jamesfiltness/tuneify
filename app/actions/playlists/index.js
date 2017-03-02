import * as types from '../../constants/ActionTypes.js';
import prepareTrackData from '../../utils/prepare-track-data';

export function fetchLambda(actions, endpoint, httpMethod, params, body) {
  const jwt = localStorage.getItem('idToken');
  const bodyPayload = JSON.stringify(body);

  return {
    actions,
    promise: {
      method: httpMethod,
      url: `${window.clientConfig.endpoints.awslambda.url}${endpoint}`,
      headers: {
        'Authorization': jwt,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      params: {
        ...params
      },
      body: bodyPayload,
      mode: 'cors'
    },
  }
};

export function getUserPlaylists() {
  const actions = [
    types.REQUEST_USER_PLAYLISTS,
    types.RECEIVE_USER_PLAYLIST_DATA,
    types.USER_PLAYLIST_REQUEST_ERROR
  ];

  return fetchLambda(actions, 'playlists', 'GET');
}

export function createPlaylist(playlistName, playlist) {
  const actions = [
    types.CREATE_PLAYLIST,
    types.PLAYLIST_CREATED,
    types.PLAYLIST_CREATE_ERROR
  ];

  const body = {
    playlistName,
    playlist,
  };

  return fetchLambda(actions, 'playlists', 'POST', null, body);
}

export function updatePlaylist(playlist, trackToAdd, trackToAddImg) {
  const actions = [
    types.UPDATE_PLAYLIST,
    types.PLAYLIST_UPDATED,
    types.PLAYLIST_UPDATE_ERROR
  ];


  const preparedTrack = prepareTrackData([trackToAdd], trackToAddImg);

  const updatedTracklist = playlist.tracks.concat(preparedTrack);

  const body = {
    playlistId: playlist.id,
    updatedTracklist,
  };

  return fetchLambda(actions, 'playlists', 'PUT', null, body);
}
