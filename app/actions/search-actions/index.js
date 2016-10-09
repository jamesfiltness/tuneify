require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'
import * as types from '../../constants/ActionTypes.js'
import { playVideo } from '../player-actions'
import { handleErrors, handleServerErrors } from '../../utils/handleErrors'
import { push } from 'react-router-redux'

export function lastFmApiRequest(searchTerm) {
  return {
    type: types.LAST_FM_API_REQUEST,
    searchTerm,
  }
};

export function clearSearch() {
  return {
    type: types.CLEAR_SEARCH
  }
};

export function artistSelected(artist) {
  return {
    type: types.ARTIST_SELECTED,
    artist,
  }
};

export function autocompleteArtistSelected(selectedArtistData) {
  return (dispatch, getState)  => {
    dispatch(artistSelected(selectedArtistData));
    dispatch(push('/about'))
  }
};

export function autocompleteTrackSelected(selectedTrackData) {
  return (dispatch, getState)  => {
    dispatch(trackSelected(selectedTrackData));
    dispatch(fetchVideoData(selectedTrackData)).then(() => {
      dispatch(playVideo(getState().videoData));
    });
  }
};

export function trackSelected(selectedTrackData) {
  return {
    type: types.TRACK_SELECTED,
    selectedTrackData,
  }
}

export function receiveArtistData(searchTerm, json) {
  return {
    type: types.RECEIVE_ARTIST_DATA,
    artists : json.results.artistmatches.artist.map(child => child)
  }
}

export function receiveVideoData(json) {
  return {
    type: types.RECEIVE_VIDEO_DATA,
    videoData : json.items
  }
}

export function receiveTrackData(searchTerm, json) {
  return {
    type: types.RECEIVE_TRACK_DATA,
    tracks : json.results.trackmatches.track.map(child => child)
  }
}

export function receiveAlbumData(searchTerm, json) {
  return {
    type: types.RECEIVE_ALBUM_DATA,
    albums : json.results.albummatches.album.map(child => child)
  }
}

export function fetchArtistData(searchTerm) {
  return dispatch => {
    return fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchTerm}&api_key=57ee3318536b23ee81d6b27e36997cde&format=json&limit=3`,{mode: 'cors'})
      .then(handleErrors)
      .then(response => response.json())
      .then(json => { dispatch(receiveArtistData(searchTerm, json)) })
      .catch(handleServerErrors)
  }
}

export function fetchTrackData(searchTerm) {
  return dispatch => {
    return fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchTerm}&api_key=57ee3318536b23ee81d6b27e36997cde&format=json&limit=3`,{mode: 'cors'})
      .then(handleErrors)
      .then(response => response.json())
      .then(json => { dispatch(receiveTrackData(searchTerm, json)) })
      .catch(handleServerErrors)
  }
}

export function fetchAlbumData(searchTerm) {
  return dispatch => {
    return fetch(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchTerm}&api_key=57ee3318536b23ee81d6b27e36997cde&format=json&limit=4`,{mode: 'cors'})
      .then(handleErrors)
      .then(response => response.json())
      .then(json => { dispatch(receiveAlbumData(searchTerm, json)) })
      .catch(handleServerErrors)
    }
}

export function searchPerformed(searchTerm) {
  return dispatch => {
    if(searchTerm.length > 1) {
      dispatch(lastFmApiRequest(searchTerm));
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
  const selectedTrackString = `${selectedTrackData.name} - ${selectedTrackData.artist}`;
  return dispatch => {
    return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${selectedTrackString}&type=video&key=AIzaSyBXmXzAhx7HgpOx9jdDh6X_y5ar13WAGBE` ,{mode: 'cors'})
      .then(response => response.json())
      .then(json => { dispatch(receiveVideoData(json)) })
      .catch(handleServerErrors)
    }
}

