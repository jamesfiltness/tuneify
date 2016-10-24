import React from 'react'

class PlayQueue extends React.Component {
  constructor() {
    super();

    this.state = {
      renderPlayQueue: false,
    };
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
            this.props.tracks.map((track, i) => {
              console.log(track);
              return (
                <li
                  key={i}
                  className="play-queue__list-item"
                >
                <span className="play-queue__artist">
                  {track.artist.name}
                 </span>
                 <span className="play-queue__track">
                   {track.name}
                 </span>
                </li>
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
