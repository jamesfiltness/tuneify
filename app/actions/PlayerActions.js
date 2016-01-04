require("babel-polyfill");
export const CUE_VIDEO = 'CUE_VIDEO';

export function cueVideo(videoId) {
    return {
        type: CUE_VIDEO,
        videoId
    }
}