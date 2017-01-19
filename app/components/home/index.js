import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classNames';
import { 
  getTopArtists, 
} from '../../actions/homepage';

export class Home extends React.Component {
  
  static PropTypes = {
    dispatch: PropTypes.func.isRequired,
    topArtistData: PropTypes.array,
    topArtistDataError: PropTypes.string,
  };

  constructor() {
    super();
    this.imageLoadCount = 0;

    this.state = {
      imagesLoaded: false,
    }
  }

  // only call for data once the page
  // has rendered on the client as lastfm's
  // rate limiting allows 5 requests per second
  // per originating IP adress averaged over a 5 minute period
  componentDidMount() {
    this.props.dispatch(
      getTopArtists()
    );
  }

  imageLoaded() {
    this.imageLoadCount++;
    if (this.imageLoadCount === 50) {
      this.setState({
        imagesLoaded: true
      });
    }
  }

  render() {
    const { topArtistData, topArtistDataError } = this.props;
    if (topArtistData) {
      // sometimes lastfm returns successfully but with an empty 
      // json object. To counter this the reducer has a case for
      // this an returns and error property when it does happen
      if (topArtistData.error) {
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
                topArtistData.artistData.map(
                  (artist, i) => {
                    return (
                      <li className="top-artist__list-item" key={i}>
                        <img 
                          onLoad={() => {this.imageLoaded()}}
                          className="top-artist__image" 
                          src={artist.image[3]['#text']}
                          height="230"
                          width="230"
                        />
                        <span className={classes}>{artist.name}</span>
                      </li>
                    );
                  }
                )
              }
            </ul>
          </div>
        );
      }
    } else if(topArtistDataError) {
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

function mapStateToProps(state) {
  return {
    topArtistData: state.topArtists.topArtistData,
    topArtistDataError: state.topArtists.topArtistDataError,
  }
}

export default connect(mapStateToProps)(Home);
