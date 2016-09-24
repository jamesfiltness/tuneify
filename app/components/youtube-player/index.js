import React from 'react'

class YouTubePlayer extends React.Component {
  constructor() {
    super();
    this.loaded = false;
  }

  componentDidMount() {
	    var _this = this;
		  
      window.onYouTubeIframeAPIReady = function() {
            _this.loaded = true;
            _this.iFrameAPIReady();
      }

      this.loadPlayerIframe();
  }

  render() {
      return (
            <div className="youtube-player">
              <div className="youtube-player__player" id="player"></div>
              <div className="youtube-player__play-button">Play</div>
            </div>
      )
  }

  componentDidUpdate() {
    if(this.loaded) {
      //so in here we need to get the video id first then call cuevideo
        this.cueVideo(this.props.currentVideo); 
    } 
  }

  loadPlayerIframe() {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
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

  onPlayerStateChange() {

  }

  cueVideo(videoId) {
      this.player.cueVideoById(videoId)
  }

	
}
export default YouTubePlayer
