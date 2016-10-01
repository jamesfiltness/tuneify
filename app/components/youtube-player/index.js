import React from 'react'

class YouTubePlayer extends React.Component {
  constructor() {
    super();
    this.loaded = false;
    this.state = {
      currentVideoId: null,
    }
  }

  componentDidMount() {
	  const _this = this;
		
    window.onYouTubeIframeAPIReady = function() {
      _this.loaded = true;
      _this.iFrameAPIReady();
    }

    this.loadPlayerIframe();
  }

  render() {
    return (
      <div className="youtube-player">
        <div className="youtube-player__player" id="player" />
        <div className="youtube-player__play-button">Play</div>
      </div>
    )
  }

  componentDidUpdate(nextProps) {
    console.log('componentDidUpdate');
    if(this.loaded) {
    if(nextProps.videoData.length > 0) {
      console.log('next video props', nextProps.videoData[0]);
     if(nextProps.videoData[0].id.videoId !== this.state.currentVideoId) {
       console.log('ids do not match - play new video');
        this.playVideo(nextProps.videoData[0].id.videoId);
      }
    }
      //so in here we need to get the video id first then call cuevideo
   //   this.cueVideo(this.props.currentVideo); 
    } 
  }
// move in to reusable utils class - allow multiple scripts to be loaded
  loadPlayerIframe() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); 
  }

  iFrameAPIReady() {
    this.player = new YT.Player('player', {
      height: '390',
      playerVars: { 'autoplay': 1, 'controls': 0, 'showinfo': 0, 'rel': 0},
      width: '640',
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    });
  }

  onPlayerStateChange(data) {
console.log('player state change', data);
  }

  playVideo(videoId) {
    this.player.cueVideoById(videoId);
this.player.playVideo();
this.setState({
    currentVideoId: videoId,
});
  }

	
}
export default YouTubePlayer
