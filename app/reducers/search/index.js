import * as types from '../../constants/ActionTypes.js'

export function currentSearch(state = '' , action) {
  switch (action.type) {
    case types.REQUEST_DATA:
      return  action.searchTerm
    case types.CLEAR_SEARCH:
      return  null;
    default: 
      return state
  }    
}

export function currentTrackSummaryData(state = {}, action) {
  switch (action.type) {
    case types.TRACK_SELECTED:
      return action.selectedTrackSummaryData
    case types.RECEIVE_CURRENT_TRACK_DATA:
      return {
        artist: action.json.track.artist.name,
        trackName: action.json.track.name,
        image: action.json.track.album.image[1]['#text'],
      }
    default: 
      return state
  }
}

export function currentArtist(state = {}, action) {
  switch (action.type) {
    case types.ARTIST_SELECTED:
      return action.artist
    default: 
      return state
  }
}

export function currentAlbum(state = {}, action) {
  switch (action.type) {
    case types.ALBUM_SELECTED:
      return action.album
    default: 
      return state
  }
}

export function currentArtistResults(state = [] , action) {
  switch (action.type) {
    case types.RECEIVE_ARTIST_DATA:
      //we always want a fresh set of results returned to the state
      const results = [];
      const artists = 
      action
        .json
        .results
        .artistmatches.artist.map(child => child);
      return results.concat(artists);
    case types.CLEAR_SEARCH: 
      return []
    default: 
      return state
  }
}

export function currentTrackResults(state = [] , action) {
  switch (action.type) {
    case types.RECEIVE_TRACK_DATA:
      //we always want a fresh set of results returned to the state
      const results = [];
      const tracks = 
      action
        .json
        .results
        .trackmatches.track.map(child => child);
      return results.concat(tracks);
    case types.CLEAR_SEARCH: 
      return []
    default: 
      return state
  }
}

export function currentAlbumResults(state = [] , action) {
  switch (action.type) {
    case types.RECEIVE_ALBUM_DATA:
      //we always want a fresh set of results returned to the state
      const results = [];
      const albums = 
      action
        .json
        .results
        .albummatches.album.map(child => child);
      return results.concat(albums);
    case types.CLEAR_SEARCH: 
      return []
    default: 
      return state
  }
}

export function videoData(state = [], action) {
  switch(action.type) {
    case types.RECEIVE_VIDEO_DATA:
    const results = [];
    return results.concat(action.videoData);
    default: return state
  }
}
