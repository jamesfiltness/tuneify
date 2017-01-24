import React, { PropTypes } from 'react';
import classNames from 'classNames';
import { connect } from 'react-redux';
import SavePlaylistModal from './modals/save-playlist-modal';

export class Modal extends React.Component {
  
  static PropTypes = {
    modalVisible: PropTypes.bool.isRequired,
    modalType: PropTypes.string.isRequired,
  };

  getModalContent() {
    switch(this.props.modalType) {
      case 'savePlaylist' :
        return <SavePlaylistModal />
      default: 
        return null
    }
  }
  
  render() {
    const modalContent = this.getModalContent();

    const classes = classNames(
      'modal',
       this.props.modalVisible ? 'modal--visible' : '',
    );

    return (
      <div className={classes}>
        <div className="modal__overlay">
        </div>
        <div className="modal__dialog dialog">
          <div className="dialog__content">
            {modalContent}
            <div className="dialog__close">
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


export default connect(
  mapStateToProps
)(Modal);
