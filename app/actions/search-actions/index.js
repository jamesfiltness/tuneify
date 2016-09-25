require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'
import * as types from '../../constants/ActionTypes.js'
import { handleErrors, handleServerErrors } from '../../utils/handleErrors'

export function requestData(searchTerm) {
    return {
        type: types.REQUEST_DATA,
        searchTerm
    }
}

export function clearSearch() {
    return {
        type: types.CLEAR_SEARCH
    }
}

export function trackSelected(trackData) {
  return {
    type: types.TRACK_SELECTED,
    trackData,
  }
}

export function receiveArtistData(searchTerm, json) {
    return {
        type: types.RECEIVE_ARTIST_DATA,
        artists : json.results.artistmatches.artist.map(child => child)
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
            dispatch(requestData(searchTerm));
            dispatch(fetchArtistData(searchTerm))
            dispatch(fetchTrackData(searchTerm))
            dispatch(fetchAlbumData(searchTerm))
        } else {
            dispatch(clearSearch())
        }
    }
}
