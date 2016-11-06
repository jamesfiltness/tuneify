import React from 'react';
import { connect } from 'react-redux';
import { 
  trashPlayQueue, 
} from '../../actions/play-queue';

class PlayQueueTools extends React.Component {
  constructor() {
    super();
    
    this.trashPlayQueue = this.trashPlayQueue.bind(this);
  }

  trashPlayQueue() {
    this.props.dispatch(trashPlayQueue());
  }

  shufflePlayQueue() {
    this.props.dispatch(shufflePlayQueue());
  }
  
  render() {
    return (
      <ul className="play-queue-tools">
        <li className="play-queue-tools__tool fa fa-save"></li>
        <li className="play-queue-tools__tool fa fa-repeat"></li>
        <li 
          className="play-queue-tools__tool fa fa-random"
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

export default connect()(PlayQueueTools);
