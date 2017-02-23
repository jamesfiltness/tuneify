import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Playlist from '../playlist';

export class PlaylistPage extends React.Component {
  static PropTypes = {
    userPlaylists: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      playlistData: null,
    };
  }

  componentDidMount() {
    this.extractPlaylist(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.extractPlaylist(nextProps);
  }

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

  render() {
    if (this.props.userPlaylists.length) {
      if (this.state.playlistData) {
        return (
          <Playlist
            tracks={this.state.playlistData.tracks}
            heading="Playlist"
            name={this.state.playlistData.name}
          />
        )
      } else {
        return (
          <div className="error-message page-with-padding">
            <h3 className="error-message__heading">
              Sorry, We can't find what you're looking for
            </h3>
          </div>
        );
      }
    } else {
      return (
        <div className="route-content-spinner" />
      )
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
)(PlaylistPage);
