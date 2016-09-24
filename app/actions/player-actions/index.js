import * as types from '../../constants/ActionTypes.js'


export function cueVideo(videoId) {
    return {
        type: types.CUE_VIDEO,
        videoId
    }
}
