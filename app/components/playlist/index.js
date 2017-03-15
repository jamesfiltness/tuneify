import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import postToFeed from '../../utils/post-to-fb-feed';
import TrackTable from '../track-table';
import TrackTools from '../track-tools';
import PlaylistImage from '../playlist-image';
import { updatePlaylist } from '../../actions/playlists';
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
    this.handleFacebookShare = this.handleFacebookShare.bind(this);

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

  getShareData() {
    let name = this.props.name;
    let description = "Listen to this playlist for free on Tuneify.com";
    let image = this.props.tracks[0].image;
    let link = `https://tuneify.fm/playlist/${encodeURIComponent(this.props.urlIdent)}`;

    if (this.props.isAlbum) {
      name = `${this.props.name} - ${this.props.artist}`;
      description = `Listen to ${name} for free on Tuneify.com`;
      image = this.props.image;
      link = `https://tuneify.fm/album/${encodeURIComponent(this.props.urlIdent)}`;
    }

    return {
      name,
      description,
      image,
      link,
    }
  }

  handleFacebookShare(e) {
    const shareData = this.getShareData();
    e.preventDefault();
    postToFeed(
      shareData.name,
      shareData.description,
      shareData.link,
      shareData.image
    );
  }

  getTwitterLink() {
    // TODO: Optimise this - call getShareData in constructor and assign to this
    // for reuse
    const shareData = this.getShareData();
    const type = this.props.isAlbum ? 'album' : 'playlist';
    const text = `${shareData.name}: Listen to this ${type} for free on Tuneify.com`;
    return `https://twitter.com/intent/tweet?text=${text}&url=${shareData.link}`;
  }

  render() {
    return (
      <div className="playlist page-with-padding">
        <a
          onClick={this.handleFacebookShare}
          data-layout="button"
          className="facebook-share"
        ></a>
        <a
          className="twitter-share"
          href={this.getTwitterLink()}>
        </a>
        <TrackTools
          visible={this.state.trackToolsVisible}
          elementPos={this.state.trackToolsElement}
          addTrackToPlaylist={
            (playlist) => {
              this.props.updatePlaylist(
                playlist,
                this.state.currentTrack,
                this.props.image,
              );
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
            {
              this.props.heading === 'Playlist' ?
              'Queue Playlist' :
              'Queue Album'
            }
          </button>
        </div>
        <TrackTable
          showEmptyWarning={this.props.showEmptyWarning}
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
  updatePlaylist,
}

export default connect(
  null,
  mapDispatchToProps
)(Playlist);
