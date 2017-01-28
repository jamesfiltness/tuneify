import React, { PropTypes } from 'react';
import SavePlaylistModal from '../save-playlist-modal';

// HOC seemed like the wrong decision here...
// TODO: look in to using HOC if it can be used appropriately here
export default class CreatePlaylistModal extends SavePlaylistModal {
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
