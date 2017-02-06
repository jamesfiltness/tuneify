import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classNames';

export class TrackTools extends React.Component {
  static PropTypes = {
    visible: PropTypes.bool.isRequired,
    elementPos: PropTypes.object,
    userPlaylists: PropTypes.array,
  };

  renderPlaylistPopup() {
    const scrollTop = document.body.scrollTop;
    const elementPos = this.props.elementPos;
    const playlists = this.props.userPlaylists.map((playlist, i) => {
      return ( 
        <li 
          className="playlist-popup__item"
          key={i} 
          onClick={
            () => this.props.appendTrackToPlaylist(playlist)
          }
        >
          {playlist.name}
        </li>
      );
    });
    
    return (
      <ul 
        className="track-tools__playlists playlist-popup"
        style={{ left: (elementPos.left - 180), top: (scrollTop) }}
      >
        {playlists}
      </ul>
    );
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
              <li 
                className="track-tools-list__item"
              >
                Add to Playlist 
                <i className="fa fa-caret-right" aria-hidden="true"></i>
              </li>
            </ul>
          </div>
          {this.renderPlaylistPopup()}
        </div>
      ) 
    }

    return null;
  }
}

function mapStateToProps(state) {
  return {
    userPlaylists: state.playlists.userPlaylists,
  }
}

export default connect(
  mapStateToProps,
)(TrackTools);
