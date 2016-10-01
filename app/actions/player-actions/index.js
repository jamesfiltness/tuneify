import * as types from '../../constants/ActionTypes.js'

export function playVideo(videoData) {
  return {
    type: types.PLAY_VIDEO,
    videoData
  }
}
