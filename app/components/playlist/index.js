import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Track from '../track';
import TrackTools from '../track-tools';
import PlaylistImage from '../playlist-image';
import { 
  addTrackToQueueAndPlay,
  appendTracksToPlayQueue,
  replaceQueueWithTracksAndPlay,
} from '../../actions/play-queue';

export class Playlist extends React.Component {
  static propTypes = {
    userPlaylists: PropTypes.array,
    appendTracksToPlayQueue: PropTypes.func.isRequired, 
    replaceQueueWithTracksAndPlay: PropTypes.func.isRequired,
    addTrackToQueueAndPlay: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    
    this.showTrackTools = this.showTrackTools.bind(this);
    this.appendAlbumToQueue = this.appendAlbumToQueue.bind(this);
    this.replaceQueueWithAlbumAndPlay = this.replaceQueueWithAlbumAndPlay.bind(this);
    
    this.state = {
      playlistData: null,
      trackToolsVisible: false,
      trackToolsElement: null,
    };
  }

  componentDidMount() {
    this.extractPlaylist(this.props);
  }
  
  componentWillReceiveProps(nextProps) {
    this.extractPlaylist(nextProps);   
  }
  
  // get the playlist from the userPlaylists state
  extractPlaylist(props) {
    const playlistId = props.params.playlistid;
    
    if (props.userPlaylists.length) {
      const playlistData = props.userPlaylists.find(
        playlist => playlist.id === playlistId
      )
      
      this.setState({
        playlistData,
      });
    }
  }
  
  appendAlbumToQueue() {
    this.props.appendTracksToPlayQueue(
      this.state.playlistData.tracks,
      "http://placehold.it/174x174"
    );
  }

  replaceQueueWithAlbumAndPlay() {
    this.props.replaceQueueWithTracksAndPlay(
      this.state.playlistData.tracks,
      "http://placehold.it/174x174"
    );
  }

  renderPlaylistTableHeader() {
    if(this.state.playlistData.tracks.length) {
      return (
        <thead className="tracks__header">
          <tr>
            <th 
              className="tracks__heading tracks__heading--no"
            >
              No
            </th>
            <th 
              className="tracks__heading tracks__heading--track"
            >
              Track
            </th>
            <th 
              className="tracks__heading tracks__heading--artist"
            >
              Artist
            </th>
            <th 
              className="tracks__heading tracks__heading--actions"
            >
              Actions
            </th>
          </tr>
        </thead>
      )
    }

    return null;
  }

  showTrackTools(event) {
    const pos = {
      left: event.target.getBoundingClientRect().left,
      top: event.target.getBoundingClientRect().top,
    };

    this.setState({
      trackToolsVisible: true,
      trackToolsElement: pos,
    });
  }

  render() {
    if (this.state.playlistData) {
      const tracks = this.state.playlistData.tracks;
      
      return (
        <div className="playlist-page">
          <TrackTools
            visible={this.state.trackToolsVisible}
            elementPos={this.state.trackToolsElement}
          />
          <div className="hero">
            <PlaylistImage 
              tracks={this.state.playlistData.tracks} 
            />
            <h5 className="hero__identifier">Playlist</h5>
            <h1 className="hero__name">{this.state.playlistData.name}</h1>
            <button 
              onClick={this.replaceQueueWithAlbumAndPlay}
              className="button button--primary button--play"
              >
              Play
            </button>
            <button 
              onClick={this.appendAlbumToQueue}
              className="button button--add"
              >
             Queue Album 
            </button>
          </div>
          <div className="tracks">
            <table className="tracks__table">
              {this.renderPlaylistTableHeader()}
              <tbody>
                {
                  tracks.map((track, i) => {
                    return (
                      <Track
                        rank={i + 1}
                        name={track.name}
                        artist={track.artist}
                        key={i}
                        onClickTrackTools={this.showTrackTools}
                        onClick={
                          () => {
                            this.props.addTrackToQueueAndPlay(
                              track,
                              track.image
                            )
                          } 
                        }
                      />
                    )
                  })
                }
              </tbody>
            </table> 
          </div>
        </div>
      )
    } else {
      return (
        <div className="route-content-spinner" />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    userPlaylists: state.playlists.userPlaylists,
  }
}

export default connect(
  mapStateToProps,
  {
    appendTracksToPlayQueue: appendTracksToPlayQueue,
    addTrackToQueueAndPlay: addTrackToQueueAndPlay,
    replaceQueueWithTracksAndPlay: replaceQueueWithTracksAndPlay,
  }
)(Playlist);
