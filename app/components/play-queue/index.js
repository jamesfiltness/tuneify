import React, { PropTypes } from 'react';
import classNames from 'classNames';
import { connect } from 'react-redux';
import { 
  playQueueTrackSelected, 
  removeTrackFromQueue 
} from '../../actions/play-queue';

export class PlayQueue extends React.Component {
  
  static PropTypes = {
    playQueueTrackSelected: PropTypes.func.isRequired,
    removeTrackFromQueue: PropTypes.func.isRequired,
    playQueueCurrentIndex: PropTypes.number,
    playQueueTracks: PropTypes.bool.array,
  }

  constructor() {
    super();

    this.currentScrollTop = 0;
    
    this.state = {
      renderPlayQueue: false,
    };
  }

  componentWillMount(nextProps) {
    this.shouldRenderPlayQueue(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.shouldRenderPlayQueue(nextProps);

    if (
      this.props.playQueueCurrentIndex !== 
      nextProps.playQueueCurrentIndex
    ) {
      this.scrollToCurrentIndex(nextProps);
    }
  }

  scrollToCurrentIndex(props) {
    let move;

    const track = props.playQueueCurrentIndex;
    const trackEl = this.playQueueWrap.querySelectorAll('.play-queue__list-item')[0];
    const trackElHeight = trackEl.getBoundingClientRect().height;
    const trackPos = track * trackElHeight;
    const trackPosBottomEdge = trackPos + trackElHeight;
    const playQueueHeight = this.playQueueWrap.getBoundingClientRect().height;  
    const scrollTopPos = this.playQueueWrap.scrollTop;
    
    if (trackPosBottomEdge > (playQueueHeight + scrollTopPos)) {
      move = trackPosBottomEdge - (playQueueHeight + scrollTopPos);
      this.playQueueWrap.scrollTop = scrollTopPos + move;
    } else if (trackPos < scrollTopPos) {
      move = scrollTopPos - trackPos;
      this.playQueueWrap.scrollTop = scrollTopPos - move;
    }
  }

  shouldRenderPlayQueue(props) {
    let renderPlayQueue;
    
    if (props.tracks && props.tracks.length) {
      renderPlayQueue = true;
    } else {
      renderPlayQueue = false;
    }

    this.setState({
      renderPlayQueue,
    });
  }

  onRemoveTrackFromQueue(event, index) {
    event.stopPropagation();
    this.props.removeTrackFromQueue(index);
  }

  render() {
    if (this.state.renderPlayQueue) {
      const currentIndex = 
        this.props.playQueueCurrentIndex ? 
        this.props.playQueueCurrentIndex : 0;
      return (
        <div 
          className="play-queue"
          ref={(playQueueWrap) => this.playQueueWrap = playQueueWrap }
        >
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
                    onClick={() => {this.props.playQueueTrackSelected(track, i)}}
                    className={classes}
                  >
                    <span className="play-queue__artist">
                      {track.artist}
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
                        <i className="fa fa-times" aria-hidden="true"></i>
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
  console.log(state);
  return {
    playQueueCurrentIndex: state.playQueue.playQueueCurrentIndex,
    playQueueTracks: state.playQueue.playQueueTracks,
  }
}

export default connect(
  mapStateToProps,
  { 
    playQueueTrackSelected: playQueueTrackSelected,
    removeTrackFromQueue: removeTrackFromQueue,
  }
)(PlayQueue);
