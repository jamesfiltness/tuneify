import React, { PropTypes } from 'react';
import classNames from 'classNames';
import { connect } from 'react-redux';
import SavePlaylistModal from './modals/save-playlist-modal';
import CreatePlaylistModal from './modals/create-playlist-modal';
import ArtistBioModal from './modals/artist-bio';
import { hideModal } from '../../actions/modal';

export class Modal extends React.Component {
  static PropTypes = {
    modalVisible: PropTypes.bool.isRequired,
    modalType: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.hideModal = this.hideModal.bind(this);
  }

  getModalContent() {
    switch(this.props.modalType) {
      case 'savePlaylist' :
        return <SavePlaylistModal text="Save Playlist" />
      case 'createPlaylist' :
        return <CreatePlaylistModal text="New Playlist" />
      case 'full-bio' :
        return <ArtistBioModal text="Artist Bio" />
      default:
        return null
    }
  }

  // Hides the modal and the overlay
  hideModal() {
    this.props.hideModal();
  }

  render() {
    const modalContent = this.getModalContent();

    const classes = classNames(
      'modal',
      `modal--${this.props.modalType}`,
       this.props.modalVisible ? 'modal--visible' : '',
    );

    return (
      <div className={classes}>
        <div
          className="modal__overlay"
          onClick={this.hideModal}
        >
        </div>
        <div className="modal__dialog dialog">
          <div className="dialog__content-container">
            {modalContent}
            <div
              className="dialog__close"
              onClick={this.hideModal}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    modalVisible: state.modal.modalVisible,
    modalType: state.modal.modalType,
  }
}

const mapDispatchToProps = {
  hideModal: hideModal,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);
