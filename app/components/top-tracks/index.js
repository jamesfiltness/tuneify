// TODO: This component is prety much identical to home
// Use higher order component to allow both home and top tracks to share code
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classNames';
import {
  getTopTracks,
  playTopTrack,
} from '../../actions/top-tracks';

export class TopTracks extends React.Component {
  static PropTypes = {
    topTrackData: PropTypes.array,
    topTrackDataError: PropTypes.string,
  };

  constructor() {
    super();
    this.imageLoadCount = 0;

    this.state = {
      imagesLoaded: false,
    }

    this.playTrack = this.playTrack.bind(this);
  }

  // only call for data once the page
  // has rendered on the client as lastfm's
  // rate limiting allows 5 requests per second
  // per originating IP adress averaged over a 5 minute period
  componentDidMount() {
    this.props.getTopTracks();
  }

  imageLoaded() {
    this.imageLoadCount++;
    if (this.imageLoadCount === 50) {
      this.setState({
        imagesLoaded: true
      });
    }
  }

  playTrack(track) {
    const name = track.name;
    const artist = track.artist.name;
    const image = track.image[3]['#text'];
    this.props.playTopTrack(name, artist, image);
  }

  render() {
    const {
      topTrackData,
      topTrackDataError
    } = this.props;

    if (topTrackData) {
      // sometimes lastfm returns successfully but with an empty
      // json object. To counter this the reducer has a case for
      // this an returns and error property when it does happen
      if (topTrackData.error) {
        return (
          <h3>No data found.</h3>
        )
      } else {

        const classes = classNames(
          'top-artist__name',
           this.state.imagesLoaded ? 'top-artist__name--visible' : '',
        );
        return (
          <div className="top-artist">
            <ul className="top-artist__list">
              {
                topTrackData.trackData.map(
                  (track, i) => {
                    return (
                      <li
                        onClick={
                          () => {
                            this.playTrack(track);
                          }
                        }
                        className="top-artist__list-item" key={i}>
                          <img
                            onLoad={() => {this.imageLoaded()}}
                            className="top-artist__image"
                            src={track.image[3]['#text']}
                            height="230"
                            width="230"
                          />
                          <span className={classes}>{track.name}</span>
                      </li>
                    );
                  }
                )
              }
            </ul>
          </div>
        );
      }
    } else if(topTrackDataError) {
      return(
        <h3>No data found.</h3>
      );
    } else {
      return (
        <div className="route-content-spinner" />
      );
    }
  }
}

const mapDispatchToProps = {
  getTopTracks,
  playTopTrack,
};

function mapStateToProps(state) {
  return {
    topTrackData: state.topTracks.topTrackData,
    topTrackDataError: state.topTracks.topTrackDataError,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopTracks);
