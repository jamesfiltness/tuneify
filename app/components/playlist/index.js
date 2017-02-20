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
    heading: PropTypes.string.isRequired,
    tracks: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    appendTracksToPlayQueue: PropTypes.func.isRequired,
    appendTrackToPlayQueue: PropTypes.func.isRequired,
    replaceQueueWithTracksAndPlay: PropTypes.func.isRequired,
    addTrackToQueueAndPlay: PropTypes.func.isRequired,
    image: PropTypes.string,
    artist: PropTypes.string,
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
      this.props.tracks,
      this.props.image
    );
  }

  replaceQueueWithPlaylistAndPlay() {
    this.props.replaceQueueWithTracksAndPlay(
      this.props.tracks,
      this.props.image
    );
  }

  renderArtistHeading() {
    return this.props.artist ?
    <h3 className="hero__artist">{this.props.artist}</h3> :
    null;
  }

  render() {
    return (
      <div className="playlist page-with-padding">
        <TrackTools
          visible={this.state.trackToolsVisible}
          elementPos={this.state.trackToolsElement}
          addToPlaylist={
            (playlist) => {

            }
          }
          addToQueue={
            () => {
              this.props.appendTrackToPlayQueue(this.state.currentTrack)
            }
          }
        />
        <div className="hero">
          <PlaylistImage
            tracks={this.props.tracks}
            image={this.props.image}
          />
          <h5 className="hero__identifier">{this.props.heading}</h5>
          <h1 className="hero__name">{this.props.name}</h1>
          {this.renderArtistHeading()}
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
          playlist={this.props.tracks}
          onClickTrackTools={this.showTrackTools}
          onClickTrack={this.props.addTrackToQueueAndPlay}
          renderArtistCol={!this.props.artist}
          playlistImg={this.props.image}
        />
      </div>
    )
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
