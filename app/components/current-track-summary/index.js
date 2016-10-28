import React from 'react';

class CurrentTrackSummary extends React.Component {
  render() {
    const {
      trackName,
      artist,
      image,
    } = this.props.trackData;
    
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

export default CurrentTrackSummary;
