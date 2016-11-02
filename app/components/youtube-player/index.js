import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classNames';
import { 
  trackEnded,
  playNextTrack,
  playPreviousTrack,
} from '../../actions/player-actions';

const PLAYER_WIDTH = 320;
const PLAYER_HEIGHT = 200;

class YouTubePlayer extends React.Component {
  constructor() {
    super();
    this.loaded = false;
    this.state = {
      currentVideoId: null,
      playerState: -1,
      muted: false,
    }
    
    this.volumeStartX = 0;
    this.volumeOffsetX = 0;
    this.volumeElement = {};
    this.videoDuration = 0;

    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.playPauseVideo = this.playPauseVideo.bind(this);
    this.playNextTrack = this.playNextTrack.bind(this);
    this.playPreviousTrack = this.playPreviousTrack.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.onCancelChangeVolume = this.onCancelChangeVolume.bind(this);
    this.onChangeVolume = this.onChangeVolume.bind(this);
    this.onMuteUnmute = this.onMuteUnmute.bind(this);
  }

  componentDidMount() {
	  const _this = this;
		
    window.onYouTubeIframeAPIReady = function() {
      _this.loaded = true;
      _this.iFrameAPIReady();
    }

    this.loadPlayerIframe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.videoData.length > 0) {
      // TODO: this needs to be much more robust - although it seems never to have failed!
      if(nextProps.videoData[0].id.videoId !== this.state.currentVideoId) {
        this.playVideo(nextProps.videoData[0].id.videoId);       
      }
    }
  } 

  playNextTrack() {
    this.props.dispatch(playNextTrack());
  }
  
  playPreviousTrack() {
    this.props.dispatch(playPreviousTrack());
  }

  playPauseVideo() {
    let playerState = this.player.getPlayerState();
    if(playerState  ===  YT.PlayerState.PLAYING) {
      this.player.pauseVideo();
      playerState = YT.PlayerState.PAUSED;
    } else if(playerState === YT.PlayerState.PAUSED) {
      this.player.playVideo();
      playerState = YT.PlayerState.PLAYING;
    }

    this.setState({
      playerState
    });
  }

  adjustVolume(e) {
    const newLeftPos = this.volumeOffsetX + e.clientX - this.volumeStartX;
    if(!(newLeftPos < 0) && !(newLeftPos > 100)) {
      this.volumeElement.style.left = (newLeftPos) + 'px';
      this.player.setVolume(newLeftPos);
    }
  }

  onChangeVolume(e) {
    this.volumeElement = e.target;
    this.volumeStartX = e.clientX;
    this.volumeOffsetX = this.volumeElement.offsetLeft;
    document.addEventListener('mousemove', this.adjustVolume, false);
    document.addEventListener('mouseup', this.onCancelChangeVolume, false);
  }

  onCancelChangeVolume() {
    document.removeEventListener('mousemove', this.adjustVolume, false);  
  }

  onMuteUnmute() {
    if(!this.state.muted) {
      this.player.mute();
    } else {
      this.player.unMute();
    }
    
    this.setState({
      muted: !this.state.muted,
    })
  }

  render() {
    const playPauseClass = this.state.playerState === 1 ? 'playing' : 'paused';
    const playButtonClasses = classNames(
      'youtube-player__play-pause',
      `youtube-player__play-pause--${playPauseClass}`
    );

    const muteClass = this.state.muted ? 'muted' : 'unmuted';
    const muteUnmuteClasses = classNames(
      'youtube-player__mute-unmute',
      `youtube-player__mute-unmute--${muteClass}`
    );

    // TODO: break volume out in to its own component
    return (
      <div className="youtube-player">
        <div className="youtube-player__player" id="player" />
        <div className="youtube-player__progress-bar">
          <div className="youtube-player__buffered" />
          <div 
            className="youtube-player__elapsed"
            ref={(elapsedEl) => this.elapsedEl = elapsedEl}
          />
        </div>
        <div className="youtube-player__controls">
          <span
            className="youtube-player__prev-track"
            onClick={this.playPreviousTrack}
          >
            Previous
          </span>
          <span 
            className={playButtonClasses}
            onClick={this.playPauseVideo}
          >
            Pause
          </span>
          <span
            className="youtube-player__next-track"
            onClick={this.playNextTrack}
          >
            Next
          </span>
          <div className="youtube-player__volume">
            <span
              onClick={this.onMuteUnmute}
              className={muteUnmuteClasses}
            >
              Mute
            </span>
            <span 
              className="youtube-player__volume-control"
              onMouseDown={this.onChangeVolume}
            />
          </div>
        </div>
      </div>
    )
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
      height: PLAYER_HEIGHT,
      width: PLAYER_WIDTH,
      playerVars: { 
        autoplay: 1, 
        controls: 0, 
        showinfo: 0, 
        rel: 0,
      },
      events: {
        'onStateChange': this.onPlayerStateChange,
        // TODO : handle player errors
        // 'onError': onPlayerError
      }
    });
  }

  updateProgressBar() {
    const elapsedToPixels = Math.floor(this.elapsed * this.pixelsPerSecond);
    this.elapsedEl.style.width = elapsedToPixels + 'px';
  }

  resetProgressBar() {
    this.elapsed = 0;
    clearInterval(this.elapsedTimer);
    this.updateProgressBar();
  }

  initProgressBar() {
    this.pixelsPerSecond = PLAYER_WIDTH / this.videoDuration;
    this.elapsedTimer = setInterval(() => {
      this.elapsed++;
      this.updateProgressBar();
    }, 1000);
  }

  onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      this.props.dispatch(trackEnded());
      this.resetProgressBar();
    }

    if (event.data === YT.PlayerState.CUED) {
      this.resetProgressBar();
    }

    if (event.data === YT.PlayerState.PLAYING) {
      this.videoDuration = this.player.getDuration();
      this.initProgressBar();
    }
  }

  playVideo(videoId) {
    this.player.cueVideoById(videoId);
    this.player.playVideo();
    this.setState({
      currentVideoId: videoId,
      playerState: YT.PlayerState.PLAYING,
    });
  }
}

export default connect()(YouTubePlayer);
