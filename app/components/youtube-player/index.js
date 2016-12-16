import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classNames';
import { 
  trackEnded,
  playNextTrack,
  playPreviousTrack,
} from '../../actions/player-actions';

const PLAYER_WIDTH = 320;
const PLAYER_HEIGHT = 200;

/*********
 TODO:  
  This needs a refactor:
  * Break out in to smaller components:
    - progress bar
    - timer
    - volume controls
  * Refactor code. Progress bar and timer have led to 
  repetitive code

*********/

export class YouTubePlayer extends React.Component {
  
  static PropTypes = {
    videoData: PropTypes.array,
    onTrackEnded: PropTypes.func.isRequired,
    onPlayNextTrack: PropTypes.func.isRequired,
    onPlayPreviousTrack: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.loaded = false;
    this.state = {
      currentVideoId: null,
      playerState: -1,
      muted: false,
      totalDuration: {},
      currentDuration: {},
    }
    
    this.volumeStartX = 0;
    this.volumeOffsetX = 0;
    this.volumeElement = {};
    this.videoDuration = 0;

    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.playPauseVideo = this.playPauseVideo.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.onCancelChangeVolume = this.onCancelChangeVolume.bind(this);
    this.onChangeVolume = this.onChangeVolume.bind(this);
    this.onMuteUnmute = this.onMuteUnmute.bind(this);
    this.seekTo = this.seekTo.bind(this);
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
      if(nextProps.videoData[0].id.videoId === this.state.currentVideoId) {
        // TODO: Just restart the current video
      } else {
        this.playVideo(nextProps.videoData[0].id.videoId);   
      }
    }
  } 

  playPauseVideo() {
    let playerState = this.player.getPlayerState();
    if(playerState  ===  YT.PlayerState.PLAYING) {
      this.player.pauseVideo();
      this.pauseProgressBar();
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

  seekTo(e) {
    const clickPos = (e.clientX + document.body.scrollLeft) - 
      e.target.getBoundingClientRect().left;
    const seekTo  = clickPos / this.pixelsPerSecond;
    this.updateProgressBar(seekTo);
    this.player.seekTo(seekTo);
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

  updateProgressBar(seekTo) {
    if (seekTo) {
      this.elapsed = seekTo;
    }
    this.updateTimer();
    const elapsedToPixels = Math.floor(this.elapsed * this.pixelsPerSecond);
    this.elapsedEl.style.width = elapsedToPixels + 'px';
  }

  resetProgressBar() {
    this.elapsed = 0;
    clearInterval(this.elapsedTimer);
    this.updateProgressBar();
  }

  resetTimer() {
    clearInterval(this.elapsedTimer);
  }

  pauseProgressBar() {
    clearInterval(this.elapsedTimer);
  }

  initProgressBar() {
    clearInterval(this.elapsedTimer);
    this.pixelsPerSecond = PLAYER_WIDTH / this.videoDuration;
    this.elapsedTimer = setInterval(() => {
      this.elapsed++;
      this.updateProgressBar();
      this.updateTimer();
    }, 1000);
  }

  initBufferBar() {
    const pixelsPerPercent = PLAYER_WIDTH / 100;
    clearInterval(this.bufferTimer);
    this.bufferTimer = setInterval(() => {
      this.buffer++;
      const buffered = this.player.getVideoLoadedFraction();
      if(buffered === 1) {
        clearInterval(this.bufferTimer);
      }
      const bufferedPixels = (buffered * 100) * pixelsPerPercent;
      this.bufferedEl.style.width = bufferedPixels + 'px';
    }, 1000)
  }
  
  // TODO : repitition
  initTimer() {
    const totalDuration = this.secondsToTime(this.videoDuration);
    let currentDuration = this.state.currentDuration; 
    if(
      !currentDuration.minutes &&
      !currentDuration.seconds
    ) {
      currentDuration = {
        seconds: '00',
        minutes: '0',
      }
    }
    this.setState({
      totalDuration,
      currentDuration,
    })
  }

  updateTimer() {
    const currentDuration = this.secondsToTime(this.elapsed);
    if (currentDuration.minutes < 1) {

      currentDuration.minutes = '0';
    }
    this.setState({
      currentDuration,
    })
  }

  onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      this.props.onTrackEnded();
      this.resetProgressBar();
      this.resetTimer();
    }

    if (event.data === YT.PlayerState.CUED) {
      this.resetProgressBar();
    }

    if (event.data === YT.PlayerState.PLAYING) {
      // getDuration() will return 0 until the video's metadata is loaded,
      // which normally happens just after the video starts playing.
      this.videoDuration = this.player.getDuration();
      this.initProgressBar();
      this.initTimer();
    }

    if (event.data === YT.PlayerState.BUFFERING) {
      this.initBufferBar();
    }
    
    if (event.data === YT.PlayerState.PAUSED) {
      this.pauseProgressBar();
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

  secondsToTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds - minutes * 60);
    
    if (remainingSeconds < 10) {
      remainingSeconds = `0${remainingSeconds}`;
    }
    return {
      minutes,
      seconds: remainingSeconds,
    }
  }

  render() {
    const playPauseClass = this.state.playerState === 1 ? 'playing' : 'paused';
    const playButtonClasses = classNames(
      'youtube-player__play-pause',
      'youtube-player__control',
      `youtube-player__play-pause--${playPauseClass}`
    );

    const muteClass = this.state.muted ? 'muted' : 'unmuted';
    const muteUnmuteClasses = classNames(
      'youtube-player__mute-unmute',
      'youtube-player__control',
      `youtube-player__mute-unmute--${muteClass}`
    );

    // TODO: break volume out in to its own component
    return (
      <div className="youtube-player">
        <div className="youtube-player__player-wrap">
          <div className="youtube-player__player" id="player" />
          <div 
            className="youtube-player__progress-bar"
            onClick={this.seekTo}
          >
            <div 
              className="youtube-player__buffered" 
              ref={(bufferedEl) => this.bufferedEl = bufferedEl}
            />
            <div 
              className="youtube-player__elapsed"
              ref={(elapsedEl) => this.elapsedEl = elapsedEl}
            />
          </div>
        </div>
        <div className="youtube-player__controls">
          <span
            className="youtube-player__control youtube-player__prev-track"
            onClick={this.props.onPlayPreviousTrack}
          />
          <span 
            className={playButtonClasses}
            onClick={this.playPauseVideo}
          />
          <span
            className="youtube-player__control youtube-player__next-track"
            onClick={this.props.onPlayNextTrack}
          />
          <div className="youtube-player__time">
            <span 
              className="youtube-player__elapsed-time"
            >
              {this.state.currentDuration.minutes || '0'}:
              {this.state.currentDuration.seconds || '00'}
            </span>
            
            <span className="youtube-player__divider">|</span>
            
            <span 
              className="youtube-player__total-time"
            >
              {this.state.totalDuration.minutes || '0'}:
              {this.state.totalDuration.seconds || '00'}
            </span>
          </div>
          <div className="youtube-player__volume">
            <span
              onClick={this.onMuteUnmute}
              className={muteUnmuteClasses}
            />
            <span 
              className="youtube-player__volume-control"
              onMouseDown={this.onChangeVolume}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  {
    onTrackEnded: trackEnded,
    onPlayNextTrack: playNextTrack,
    onPlayPreviousTrack: playPreviousTrack,
  }
)(YouTubePlayer);
