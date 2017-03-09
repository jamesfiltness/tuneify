import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classNames';
import auth0Service from '../../utils/auth0-service';
import {
  trashPlayQueue,
  shuffle,
  savePlayList,
  repeat,
} from '../../actions/play-queue';
import {
  loggedIn,
  loggedOut
} from '../../actions/auth';

const authService = new auth0Service();

export class PlayQueueTools extends React.Component {
  static PropTypes = {
    shuffle: PropTypes.bool.isRequired,
    repeat: PropTypes.bool.isRequired,
    onSavePlayList: PropTypes.func.isRequired,
    onShuffle: PropTypes.func.isrequired,
    onRepeat: PropTypes.func.isRequired,
    onTrashPlayQueue: PropTypes.func.isRequired,
    playQueueTracks: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.savePlaylist = this.savePlaylist.bind(this);
  }

  savePlaylist() {
    if (this.props.playQueueTracks.length) {
      if (!authService.isLoggedIn()) {
        this.props.loggedOut();
        authService.authenticate(() => {
          this.props.loggedIn();
          this.props.onSavePlayList();
        })
      } else {
        this.props.onSavePlayList();
      }
    }
  }

  render() {
    const shuffleState = this.props.shuffle ? 'on' : 'off';
    const repeatState = this.props.repeat ? 'on' : 'off';
    const shuffleClasses = classNames(
      'play-queue-tools__tool fa fa-random',
      'play-queue-tools__shuffle',
      `play-queue-tools__shuffle--${shuffleState}`,
    );

    const repeatClasses = classNames(
      'play-queue-tools__tool fa fa-repeat',
      'play-queue-tools__repeat',
      `play-queue-tools__repeat--${repeatState}`,
    );

    const saveClasses = classNames(
      'play-queue-tools__tool',
      'play-queue-tools__save',
      !this.props.playQueueTracks.length ? 'play-queue-tools__save--disabled' : '',
      'fa fa-save',
    )

    return (
      <ul className="play-queue-tools">
        <li
          className={saveClasses}
          title="Save queue as Playlist"
          onClick={this.savePlaylist}
        ></li>
        <li
          className={repeatClasses}
          title="Repeat"
          onClick={this.props.onRepeat}
        ></li>
        <li
          className={shuffleClasses}
          title="Shuffle"
          onClick={this.props.onShuffle}
        ></li>
        <li
          className="play-queue-tools__tool fa fa-trash"
          title="Trash play queue"
          onClick={this.props.onTrashPlayQueue}
        ></li>
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shuffle: state.playQueue.shuffle,
    repeat: state.playQueue.repeat,
    playQueueTracks: state.playQueue.playQueueTracks,
    authenticated: state.authenticated,
  }
}

const mapDispatchToProps = {
  onShuffle: shuffle,
  onRepeat: repeat,
  onTrashPlayQueue: trashPlayQueue,
  onSavePlayList: savePlayList,
  loggedIn,
  loggedOut,
}

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(PlayQueueTools);
