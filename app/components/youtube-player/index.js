import React from 'react';
import { connect } from 'react-redux';
import { trackEnded } from '../../actions/player-actions';

class YouTubePlayer extends React.Component {
  constructor() {
    super();
    this.loaded = false;
    this.state = {
      currentVideoId: null,
    }

    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
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
    if(event.data === YT.PlayerState.ENDED) {
      this.props.dispatch(trackEnded());
    }
  }

  playVideo(videoId) {
    this.player.cueVideoById(videoId);
    this.player.playVideo();
    this.setState({
      currentVideoId: videoId,
    });
  }
}

export default connect()(YouTubePlayer);
