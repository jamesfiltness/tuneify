import React from 'react'
import { connect } from 'react-redux'
import { 
  getTopArtists, 
} from '../../actions/homepage-actions'

class Home extends React.Component {
  // only call for data once the page
  // has rendered on the client as lastfm's
  // rate limiting allows 5 requests per second
  // per originating IP adress averaged over a 5 minute period
  componentDidMount() {
    this.props.dispatch(
      getTopArtists()
    );
  }

  render() {
    const { topArtistData, topArtistDataError } = this.props;
    if (topArtistData) {
      console.log('yoo hoo');

    console.log(topArtistData);
      // sometimes lastfm returns successfully but with an empty 
      // json object. To counter this the reducer has a case for
      // this an returns and error property when it does happen
      if(topArtistData.error) {
        return (
          <h3>No data found.</h3>
        )
      } else {
        console.log('sdfdsfsdf');
        return (
          <div className="top-artist">
            <ul className="top-artist__list">
              {
                topArtistData.artistData.map(
                  (artist, i) => {
                    return (
                      <li className="top-artist__list-item" key={i}>
                        <img 
                          className="top-artist__image" 
                          src={artist.image[3]['#text']} 
                          width="229"
                          height="229"
                        />
                        <span className="top-artist__name">{artist.name}</span>
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
        <div className="spinner" />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    topArtistData: state.topArtistData,
    topArtistDataError: state.topArtistDataError,
  }
}

export default connect(mapStateToProps)(Home);
