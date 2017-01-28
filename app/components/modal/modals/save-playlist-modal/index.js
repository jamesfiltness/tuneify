import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createPlaylist } from '../../../../actions/playlists';

export class SavePlaylistModal extends React.Component {
  static PropTypes = {
    playQueue: PropTypes.array.isRequired
  };
  
  constructor(props) {
    super(props);
    
    this.state = {
      saveError: false,
    }

    this.savePlaylist = this.savePlaylist.bind(this);
    this.updateErrorState = this.updateErrorState.bind(this);
  }
  
  savePlaylist() {
    if (!this.input.value.length) {
      this.showErrorState(); 
    } else {
      this.props.createPlaylist(
        this.input.value, 
        this.props.playQueue
      );
    }
  }

  showErrorState() {
    this.setState({
      saveError: true,  
    })
  }

  showErrorMessage() {
    return this.state.saveError ?
    <p className="dialog__error-text">
      Please give your playlist a name
    </p> : 
    null
  }

  updateErrorState() {
    if (this.input.value.length) {
      this.setState({
        saveError: false,
      });
    }  
  }

  render() {
    console.log('11111sdfsdfsfd', this.props);
    const inputClasses = classNames(
      'dialog__input',
      this.state.saveError ? 'dialog__input--error' : '',
    );
    
    const spinnerClasses = classNames(
      'dialog__spinner',
      this.props.creatingUserPlaylist ? 'dialog__spinner--visible' : '',
    );

    return (
      <div className="save-playlist-modal">
        <h3 className="dialog__heading">
          Save playlist 
        </h3>
        <div className="dialog__content">
          {this.showErrorMessage()}
          <input 
            type="text" 
            onChange={this.updateErrorState}
            placeholder="Give your playlist a name" 
            ref={(input) => { this.input = input }}
            className={inputClasses}
          />
          <button
            onClick={this.savePlaylist}
            className="dialog__button"
          >
            Create
          </button>
          <div className={spinnerClasses}>
            <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    )
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
)(SavePlaylistModal);
