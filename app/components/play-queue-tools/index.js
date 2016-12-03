import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classNames';
import { 
  trashPlayQueue,
  shuffle,
  repeat,
} from '../../actions/play-queue';

class PlayQueueTools extends React.Component {

  static PropTypes = {
    dispatch: PropTypes.func.isRequired,
    shuffle: PropTypes.bool.isRequired,
    repeat: PropTypes.bool.isRequired,
  };

  constructor() {
    super();
    
    this.trashPlayQueue = this.trashPlayQueue.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.repeat = this.repeat.bind(this);
  }

  trashPlayQueue() {
    this.props.dispatch(trashPlayQueue());
  }

  shuffle() {
    this.props.dispatch(shuffle());
  }

  repeat() {
    this.props.dispatch(repeat());
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


    return (
      <ul className="play-queue-tools">
        <li className="play-queue-tools__tool fa fa-save"></li>
        <li 
          className={repeatClasses}
          onClick={this.repeat}
        ></li>
        <li 
          className={shuffleClasses}
          onClick={this.shuffle}
        ></li>
        <li 
          className="play-queue-tools__tool fa fa-trash"
          onClick={this.trashPlayQueue}
        >
        </li>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    shuffle: state.playQueue.shuffle,
    repeat: state.playQueue.repeat, 
  }
}

export default connect(mapStateToProps)(PlayQueueTools);
