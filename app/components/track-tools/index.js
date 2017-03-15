import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classNames';
import auth0Service from '../../utils/auth0-service';
import {
  loggedIn,
  loggedOut,
} from '../../actions/auth';

// TODO: this should be instantiated only one (in App) and then passed around
// on context perhaps
const authService = new auth0Service();

export class TrackTools extends React.Component {
  static PropTypes = {
    visible: PropTypes.bool.isRequired,
    addTrackToPlaylist: PropTypes.func.isRequired,
    addToQueue: PropTypes.func.isRequired,
    elementPos: PropTypes.object,
    userPlaylists: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.showPlaylists = this.showPlaylists.bind(this);
    this.hidePlaylists = this.hidePlaylists.bind(this);

    this.state = {
      addToPlaylistActive: false,
    };
  }

  // TODO: this pattern is used in a few places
  // extract out and allow a utility method to perform this
  // it should accept a callback to call when authenticated
  addTrackToPlaylist(playlist) {
    if (!authService.isLoggedIn()) {
      this.props.loggedOut();
      authService.authenticate(() => {
        this.props.loggedIn();
        this.props.addTrackToPlaylist(playlist);
      })
    } else {
      this.props.addTrackToPlaylist(playlist);
    }
  }

  renderPlaylistPopup() {
    const scrollTop = document.body.scrollTop;
    const elementPos = this.props.elementPos;
    const playlists = this.props.userPlaylists.map((playlist, i) => {
      return (
        <li
          className="playlist-popup__item"
          key={i}
          onClick={
            () => this.addTrackToPlaylist(playlist)
          }
        >
          {playlist.name}
        </li>
      );
    });

    return (
      <ul
        className="track-tools__playlists playlist-popup"
        style={
          {
            left:  (elementPos.left - 180),
            top: 10,
            height: (window.innerHeight - 20),
            display: this.state.addToPlaylistActive ? 'block' : 'none'
          }
        }
      >
        {playlists}
      </ul>
    );
  }

  showPlaylists() {
    this.setState({
      addToPlaylistActive: true,
    });
  }

  hidePlaylists() {
    this.setState({
      addToPlaylistActive: false,
    });
  }

  renderAddToPlaylist() {
    return authService.isLoggedIn() ?
      <li
        className="track-tools-list__item"
        onMouseOver={this.showPlaylists}
        onMouseLeave={this.hidePlaylists}
      >
        Add to Playlist
        <i className="fa fa-caret-right" aria-hidden="true"></i>
        {this.renderPlaylistPopup()}
      </li> :
      null;
  }

  render() {
    if (this.props.visible) {
      const elementPos = this.props.elementPos;

      return (
        <div className="tracks-tools-container">
          <div
            className="track-tools"
            style={{ left: elementPos.left, top: (elementPos.top + 20) }}
          >
            <ul className="track-tools__list track-tools-list">
              <li
                className="track-tools-list__item"
                onClick={this.props.addToQueue}
              >
                Add to Queue
              </li>
              {this.renderAddToPlaylist()}
            </ul>
          </div>
        </div>
      )
    }

    return null;
  }
}

const mapDispatchToProps = {
  loggedIn,
  loggedOut,
}

function mapStateToProps(state) {
  return {
    userPlaylists: state.playlists.userPlaylists,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrackTools);
