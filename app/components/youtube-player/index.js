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
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.videoData.length > 0) {
      // this needs to be much more robust - although it seems never to have failed!
      if(nextProps.videoData[0].id.videoId !== this.state.currentVideoId) {
        this.playVideo(nextProps.videoData[0].id.videoId);       
      }
    }
  } 
  
  // move in to reusable utils class - allow multiple scripts to be loaded
  loadPlayerIframe() {
    const tag = document.createElement('script');
    tag.src = "http://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); 
  }

  iFrameAPIReady() {
    this.player = new YT.Player('player', {
      height: '200',
      playerVars: { 'autoplay': 1, 'controls': 0, 'showinfo': 0, 'rel': 0},
      width: '320',
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    });
  }

  onPlayerStateChange(event) {
    // in here if the player state change is video ended we need to dispatch 
    // an action. 
    // that action can get picked up by a play queue reducer which will then 
    // queue the next track
    // simples
    if(event.data === YT.PlayerState.ENDED) {
      alert('ended');
    }
   // console.log(event.data);
   // console.log('player state change', event);
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
