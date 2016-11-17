import React from 'react';
import classNames from 'classNames';
import { connect } from 'react-redux';
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

  onSelectTrack(track, index) {
    this.props.dispatch(playQueueTrackSelected(track, index));
  }

  onRemoveTrackFromQueue(event, index) {
    event.stopPropagation();
    this.props.dispatch(removeTrackFromQueue(index));
  }

  render() {
    if(this.state.renderPlayQueue) {
      const currentIndex = 
        this.props.playQueueCurrentIndex ? 
        this.props.playQueueCurrentIndex : 0;
      return (
        <div className="play-queue">
          <ul className="play-queue__list">
            {
              this.props.tracks.map((track, i) => {
                const selected = currentIndex === i ? 
                  'play-queue__list-item--selected' : 
                  null;

                const classes = classNames(
                  'play-queue__list-item',
                  selected,
                );
                return (
                  <li
                    key={i}
                    onClick={() => {this.onSelectTrack(track, i)}}
                    className={classes}
                  >
                    <span className="play-queue__artist">
                      {track.artist.name}
                    </span>
                    <span className="play-queue__track">
                      {track.name}
                    </span>
                    <span 
                      onClick={
                        (event) => {
                          this.onRemoveTrackFromQueue(event, i)
                        }
                      }
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
      return <div className="play-queue__placeholder"></div>
    }
  }
}


function mapStateToProps(state) {
  return {
    playQueueCurrentIndex: state.playQueue.playQueueCurrentIndex,
    playQueueTracks: state.playQueue.playQueueTracks,
  }
}

export default connect(mapStateToProps)(PlayQueue);
