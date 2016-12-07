import React, { PropTypes } from 'react';

export class CurrentTrackSummary extends React.Component {
  static defaultProps = {
    trackName: 'Welcome to Tuneify',
    artist: 'Free streaming music',
  };

  static propTypes = {
    trackName: PropTypes.string,
    artist: PropTypes.string,
    image: PropTypes.string,
  };

  render() {
    let imageSrc;
    
    const {
      trackName,
      artist,
      image,
    } = this.props;
    
    return (
      <div className="current-track-summary">
        <img 
          className="current-track-summary__thumb" 
          src={image}
          width="64"
          height="64"
        />
        <h3 className="current-track-summary__track-name">{trackName}</h3>
        <h4 className="current-track-summary__artist">{artist}</h4>
      </div>
    )
  }
}

export default CurrentTrackSummary

