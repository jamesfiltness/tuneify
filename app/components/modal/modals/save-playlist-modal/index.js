import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createPlaylist } from '../../../../actions/playlists';

export class SavePlaylistModal extends React.Component {
  static PropTypes = {
    playQueue: PropTypes.array.isRequired
  };
  
  constructor(props) {
    super(props);
    this.savePlaylist = this.savePlaylist.bind(this);
  }
  
  savePlaylist() {
    this.props.createPlaylist(this.input.value, this.props.playQueue);
  }
   
  render() {
    return (
      <div className="save-playlist-modal">
        <h3>Save playlist modal</h3>
        <input 
          type="text" 
          placeholder="Give your playlist a name" 
          ref={(input) => { this.input = input }}
        />
        <button
          onClick={this.savePlaylist}
        >
          Create
        </button>
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