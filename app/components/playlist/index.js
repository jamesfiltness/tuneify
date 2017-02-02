import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TrackTable from '../track-table';
import TrackTools from '../track-tools';
import PlaylistImage from '../playlist-image';
import { 
  appendTracksToPlayQueue,
  appendTrackToPlayQueue,
  addTrackToQueueAndPlay,
  replaceQueueWithTracksAndPlay,
} from '../../actions/play-queue';

export class Playlist extends React.Component {
  static PropTypes = {
    playlistData: PropTypes.array,
    appendTracksToPlayQueue: PropTypes.func.isRequired, 
    appendTrackToPlayQueue: PropTypes.func.isRequired, 
    replaceQueueWithTracksAndPlay: PropTypes.func.isRequired,
    addTrackToQueueAndPlay: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    
    this.showTrackTools = this.showTrackTools.bind(this);
    this.appendPlaylistToQueue = this.appendPlaylistToQueue.bind(this);
    this.replaceQueueWithPlaylistAndPlay = this.replaceQueueWithPlaylistAndPlay.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);

    this.state = {
      trackToolsVisible: false,
      trackToolsElement: null,
    }
  }
  
  componentDidMount() { 
    document.addEventListener(
      'click', 
      this.handleDocumentClick, false
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      'click', 
      this.handleDocumentClick, false
    );
  }

  handleDocumentClick(e) {
    if (!e.target.classList.contains('track__options')) {
      this.setState({
        trackToolsVisible: false,  
      });
    }
  }

  showTrackTools(track, event) {
    const pos = {
      left: event.target.getBoundingClientRect().left,
      top: (event.target.getBoundingClientRect().top + window.pageYOffset),
    };

    this.setState({
      trackToolsVisible: true,
      trackToolsElement: pos,
      currentTrack: track,
    });
  }
  
  appendPlaylistToQueue() {
    this.props.appendTracksToPlayQueue(
      this.props.playlistData.tracks
    );
  }

  replaceQueueWithPlaylistAndPlay() {
    this.props.replaceQueueWithTracksAndPlay(
      this.props.playlistData.tracks
    );
  }

  render() {
    if (this.props.playlistData) {
      const tracks = this.props.playlistData.tracks;
      
      return (
        <div className="playlist">
          <TrackTools
            visible={this.state.trackToolsVisible}
            elementPos={this.state.trackToolsElement}
            addToQueue={
              () => {
                this.props.appendTrackToPlayQueue(this.state.currentTrack)
              }
            }
          />
          <div className="hero">
            <PlaylistImage 
              tracks={this.props.playlistData.tracks} 
            />
            <h5 className="hero__identifier">Playlist</h5>
            <h1 className="hero__name">{this.props.playlistData.name}</h1>
            <button 
              onClick={this.replaceQueueWithPlaylistAndPlay}
              className="button button--primary button--play"
              >
              Play
            </button>
            <button 
              onClick={this.appendPlaylistToQueue}
              className="button button--add"
              >
             Queue Album 
            </button>
          </div>
          <TrackTable 
            tracks={tracks}
            onClickTrackTools={this.showTrackTools}
            onClickTrack={this.props.addTrackToQueueAndPlay}
          />
        </div>
      )
    } else {
      return (
        <div className="route-content-spinner" />
      );
    }
  }
}

const mapDispatchToProps = {
  appendTrackToPlayQueue,
  appendTracksToPlayQueue,
  addTrackToQueueAndPlay,
  replaceQueueWithTracksAndPlay,
}

export default connect(
  null, 
  mapDispatchToProps
)(Playlist);
