require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import * as types from '../../constants/ActionTypes.js';
import { playVideo } from '../player';
import { playTrack, trackSelected } from '../common';
import { appendTrackToPlayQueueAndPlay } from '../album';
import { fetchLastFmData } from '../lastfm';

export function clearSearch() {
  return {
    type: types.CLEAR_SEARCH
  }
};

export function autocompleteTrackSelected(selectedTrackData) {
  return (dispatch, getState)  => {
    dispatch(
      trackSelected({
        trackName: selectedTrackData.name, 
        artist: selectedTrackData.artist,
        image: selectedTrackData.image[1]['#text'],
      }
      )
    );
    dispatch(
      appendTrackToPlayQueueAndPlay(
        selectedTrackData
      )
    );
  }
};


export function receiveVideoData(json) {
  return {
    type: types.RECEIVE_VIDEO_DATA,
    videoData : json.items
  }
}

export function fetchArtistData(searchTerm, limit = 3) {
  const actions =  
    [
      types.LAST_FM_API_REQUEST, 
      types.RECEIVE_ARTIST_DATA,
      types.RECEIVE_ARTIST_DATA
    ];

  const params = { 
    method: 'artist.search',
    artist: searchTerm,
    limit: limit,
  };

  return fetchLastFmData(actions, params);
};

export function fetchAlbumData(searchTerm, limit = 3) {
  const actions =  
    [
      types.LAST_FM_API_REQUEST, 
      types.RECEIVE_ALBUM_DATA,
      types.RECEIVE_ALBUM_DATA
    ];

  const params = { 
    method: 'album.search',
    album: searchTerm,
    limit: limit,
  };

  return fetchLastFmData(actions, params);
};

export function fetchTrackData(searchTerm, limit = 3) {
  const actions =  
    [
      types.LAST_FM_API_REQUEST, 
      types.RECEIVE_TRACK_DATA,
      types.RECEIVE_TRACK_DATA
    ];

  const params = { 
    method: 'track.search',
    track: searchTerm,
    limit: limit,
  };

  return fetchLastFmData(actions, params);
};

export function searchPerformed(searchTerm) {
  return dispatch => {
    if(searchTerm.length > 1) {
      dispatch(fetchArtistData(searchTerm));
      dispatch(fetchTrackData(searchTerm));
      dispatch(fetchAlbumData(searchTerm));
    } else {
      dispatch(clearSearch())
    }
  }
}

export function fetchVideoData(selectedTrackData) {
  // refator this string concatenation in to a reusable method living in utils
  // TODO: Move url out in to config
  const selectedTrackString = `${selectedTrackData.name} - ${selectedTrackData.artist}`;
  return dispatch => {
    return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${selectedTrackString}&type=video&key=AIzaSyBXmXzAhx7HgpOx9jdDh6X_y5ar13WAGBE` ,{mode: 'cors'})
      .then(response => response.json())
      .then(json => { dispatch(receiveVideoData(json)) })
      .catch(handleServerErrors)
    }
}

