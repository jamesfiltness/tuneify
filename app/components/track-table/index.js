import React, { PropTypes } from 'react';
import Track from '../track';
import TrackTableHeader from './track-table-header';
import ErrorMessage from '../error-message';

export default class TrackTable extends React.Component {
  static PropTypes = {
    playlist: PropTypes.array.isRequired,
    onClickTrack: PropTypes.func.isRequired,
    onClickTrackTools: PropTypes.func.isRequired,
    renderArtistCol: PropTypes.string.isRequired,
    playlistImg: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.onClickTrack = this.onClickTrack.bind(this);
  }

  onClickTrack(track) {
    const globalPlaylistImg = this.props.playlistImg;
    const image = globalPlaylistImg ? globalPlaylistImg : track.img;
    this.props.onClickTrack(
      track,
      image
    )
  }

  render() {
    if (this.props.playlist.length) {
    return (
      <div className="tracks">
        <table className="tracks__table">
          <TrackTableHeader
            renderArtistCol={this.props.renderArtistCol}
          />
          <tbody>
            {
              this.props.playlist.map((track, i) => {
                const artist = typeof track.artist === 'string' ?
                track.artist :
                null;

                return (
                  <Track
                    rank={i + 1}
                    name={track.name}
                    artist={artist}
                    renderArtistCol={this.props.renderArtistCol}
                    key={i}
                    onClickTrackTools={
                      (event) => {
                        this.props.onClickTrackTools(track, event)
                      }
                    }
                    onClick={
                      () => {
                        this.onClickTrack(track)
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
  } else if (this.props.showEmptyWarning) {
    return (
      <ErrorMessage title="Sorry, we don't have the tracks for this album" />
    )
  } else {
    return (
      <h3>This playlist is empty.</h3>
    )
  }
}
}
