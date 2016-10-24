import React from 'react'

class PlayQueue extends React.Component {
  constructor() {
    super();

    this.state = {
      renderPlayQueue: false,
    };
  }

  componentWillMount(nextProps) {
    this.shouldRenderPlayQueue();
  }

  componentWillReceiveProps() {
    this.shouldRenderPlayQueue();
  }


  shouldRenderPlayQueue() {
  
    if(this.props.playQueue && this.props.playQueue.length) {
      this.setState({
        renderPlayQueue: true,
      });
    } 
  }

  render() {
    if(!this.state.renderPlayQueue) {
      return (
        <p>no Play queue</p>
      )
    } else {
    return (
      <div className="play-queue">
        <ul className="play-queue__list">
          {
            this.props.playQueue.map((track, i) => {
              console.log(track);
              return (
                <li>{track}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
  }
}

export default PlayQueue;
