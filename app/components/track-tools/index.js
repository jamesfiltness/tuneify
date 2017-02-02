import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classNames';

export  class TrackTools extends React.Component {
  static PropTypes = {
    visible: PropTypes.bool.isRequired,
    elementPos: PropTypes.object,
    userPlaylists: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.showPlaylists = this.showPlaylists.bind(this);
  }

  showPlaylists() {
    console.log(this.props.userPlaylists) 
  }

  render() {
    if (this.props.visible) {
      const elementPos = this.props.elementPos;

      return (
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
