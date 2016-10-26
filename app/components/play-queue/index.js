import React from 'react';
import { connect } from 'react-redux'
import { playQueueTrackSelected, removeTrackFromQueue } from '../../actions/play-queue';

class PlayQueue extends React.Component {
  constructor() {
    super();

    this.state = {
      renderPlayQueue: false,
    };

    this.onSelectTrack = this.onSelectTrack.bind(this);
  }

  componentWillMount(nextProps) {
    this.shouldRenderPlayQueue(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.shouldRenderPlayQueue(nextProps);
  }

  shouldRenderPlayQueue(props) {
    if(props.tracks && props.tracks.length) {
      this.setState({
        renderPlayQueue: true,
      });
    } 
  }

  onSelectTrack(track) {
    this.props.dispatch(playQueueTrackSelected(track));
  }

  onRemoveTrackFromQueue(event, track) {
    event.stopPropagation();
    this.props.dispatch(removeTrackFromQueue(track));
  }

  render() {
    if(this.state.renderPlayQueue) {
      return (
        <div className="play-queue">
          <ul className="play-queue__list">
            {
              this.props.tracks.map((track, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => {this.onSelectTrack(track)}}
                    className="play-queue__list-item"
                  >
                  <span className="play-queue__artist">
                    {track.artist.name}
                   </span>
                   <span className="play-queue__track">
                     {track.name}
                   </span>
                   <span 
                    onClick={(event) => {this.onRemoveTrackFromQueue(event, track)}}
                    className="play-queue__remove-track">
                    X
                   </span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect()(PlayQueue);
