import React, { PropTypes } from 'react';
import Track from '../track';
import TrackTableHeader from './track-table-header';

export default class TrackTable extends React.Component {
  static PropTypes = {
    tracks: PropTypes.array.isRequired,
    onClickTrack: PropTypes.func.isRequired,
    onClickTrackTools: PropTypes.func.isRequired,
  };
  
  render() {
    return (
      <div className="tracks">
        <table className="tracks__table">
          <TrackTableHeader />
          <tbody>
            {
              this.props.tracks.map((track, i) => {
                return (
                  <Track
                    rank={i + 1}
                    name={track.name}
                    artist={track.artist}
                    key={i}
                    onClickTrackTools={
                      (event) => {
                        this.props.onClickTrackTools(track, event)
                      }
                    }
                    onClick={
                      () => {
                        this.props.onClickTrack(
                          track,
                          track.image
                        )
                      } 
                    }
                  />
                )
              })
            }
          </tbody>
        </table> 
      </div>
    )
  }
}
