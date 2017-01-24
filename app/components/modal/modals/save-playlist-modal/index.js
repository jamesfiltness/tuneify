import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createPlaylist } from '../../../../actions/playlists';

export class SavePlaylistModal extends React.Component {
  
  static PropTypes = {
  };
   
  render() {
    this.props.createPlaylist('name', this.props.playQueue);
    return (
      <div className="save-playlist-modal">
        <h3>Save playlist modal</h3>
        <input 
          type="text" 
          placeholder="Give your playlist a name" 
        />
        <button>Create</button>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    playQueue: state.playQueue.playQueueTracks,
  }
}

const mapDispatchToProps = {
  createPlaylist
}

export default connect(
 mapStateToProps, 
 mapDispatchToProps
)(SavePlaylistModal);
