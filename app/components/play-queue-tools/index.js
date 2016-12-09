import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classNames';
import { 
  trashPlayQueue,
  shuffle,
  repeat,
} from '../../actions/play-queue';

export class PlayQueueTools extends React.Component {

  static PropTypes = {
    dispatch: PropTypes.func.isRequired,
    shuffle: PropTypes.bool.isRequired,
    repeat: PropTypes.bool.isRequired,
  };

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
          onClick={this.props.onRepeat}
        ></li>
        <li 
          className={shuffleClasses}
          onClick={this.props.onShuffle}
        ></li>
        <li 
          className="play-queue-tools__tool fa fa-trash"
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
  }
}

export default connect(
  mapStateToProps,
  { 
    onShuffle: shuffle, 
    onRepeat: repeat, 
    onTrashPlayQueue: trashPlayQueue,  
  },
  )(PlayQueueTools);
