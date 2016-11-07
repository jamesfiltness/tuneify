import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classNames';
import { 
  trashPlayQueue,
  shufflePlayQueue,
} from '../../actions/play-queue';

class PlayQueueTools extends React.Component {
  constructor() {
    super();
    
    this.trashPlayQueue = this.trashPlayQueue.bind(this);
    this.shufflePlayQueue = this.shufflePlayQueue.bind(this);
  }

  trashPlayQueue() {
    this.props.dispatch(trashPlayQueue());
  }

  shufflePlayQueue() {
    console.log('sdf');
    this.props.dispatch(shufflePlayQueue());
  }
  
  render() {
    console.log(this.props);
    const shuffleState = this.props.shuffle ? 'on' : 'off';
    const shuffleClasses = classNames(
      'play-queue-tools__tool fa fa-random',
      'play-queue-tools__shuffle',
      `play-queue-tools__shuffle--${shuffleState}`,
    );

    return (
      <ul className="play-queue-tools">
        <li className="play-queue-tools__tool fa fa-save"></li>
        <li className="play-queue-tools__tool fa fa-repeat"></li>
        <li 
          className={shuffleClasses}
          onClick={this.shufflePlayQueue}
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
    shuffle : state.playQueue.playQueueShuffle,
  }
}

export default connect(mapStateToProps)(PlayQueueTools);
