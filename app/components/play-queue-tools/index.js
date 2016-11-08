import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classNames';
import { 
  trashPlayQueue,
  shufflePlayQueue,
  repeatCurrentTrack,
} from '../../actions/play-queue';

class PlayQueueTools extends React.Component {
  constructor() {
    super();
    
    this.trashPlayQueue = this.trashPlayQueue.bind(this);
    this.shufflePlayQueue = this.shufflePlayQueue.bind(this);
    this.repeatCurrentTrack = this.repeatCurrentTrack.bind(this);
  }

  trashPlayQueue() {
    this.props.dispatch(trashPlayQueue());
  }

  shufflePlayQueue() {
    this.props.dispatch(shufflePlayQueue());
  }

  repeatCurrentTrack() {
    this.props.dispatch(repeatCurrentTrack());
  }
  
  render() {
    console.log(this.props);
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
          onClick={this.repeatCurrentTrack}
        ></li>
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
    shuffle: state.playQueue.playQueueShuffle,
    repeat: state.playQueue.repeat, 
  }
}

export default connect(mapStateToProps)(PlayQueueTools);
