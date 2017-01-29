import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { SavePlaylistModal } from '../save-playlist-modal';
import { createPlaylist } from '../../../../actions/playlists';

// HOC seemed like the wrong decision here...
// TODO: look in to using HOC if it can be used appropriately here
export class CreatePlaylistModal extends SavePlaylistModal {
  savePlaylist() {
    if (!this.input.value.length) {
      this.showErrorState(); 
    } else {
      this.props.createPlaylist(
        this.input.value, 
        []
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    playQueue: state.playQueue.playQueueTracks,
    creatingUserPlaylist: state.playlists.creatingUserPlaylist,
  }
}

const mapDispatchToProps = {
  createPlaylist
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePlaylistModal);
