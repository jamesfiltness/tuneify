import * as types from '../constants/Actiontypes'


export function cueVideo(videoId) {
    return {
        type: types.CUE_VIDEO,
        videoId
    }
}