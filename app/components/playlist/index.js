import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export class Playlist extends React.Component {
  static propTypes = {
  
  };

  render() {
    if (this.props.userPlaylists.length) {
    }
    
    return (
      <p>Playlist page</p>
    )
  }
}

function mapStateToProps(state) {
  return {
    userPlaylists: state.playlists.userPlaylists,
  }
}

export default connect(
  mapStateToProps,
)(Playlist);
