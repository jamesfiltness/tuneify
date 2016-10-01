import * as types from '../../constants/ActionTypes.js'

export function playVideo(videos) {
  return {
    type: types.PlAY_VIDEO,
    videos
  }
}
