import React from 'react';
import { connect } from 'react-redux';
import { 
  clearArtistPageError, 
  getArtistPageData, 
  clearArtistPageData 
} from '../../actions/artist-actions';

class Artist extends React.Component {
  // only call for data once the page
  // has rendered on the client as lastfm's
  // rate limiting allows 5 requests per second
  // per originating IP adress averaged over a 5 minute period
  componentDidMount() {
    this.getArtistData(this.props.params.mbid);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.params.mbid !== this.props.params.mbid) {
      // TODO:  investigate whether getArtistPageData action creator
      // can use a thunk as well as using promise middleware
      // if so we can just dispatch one action instead of three here
      this.props.dispatch(clearArtistPageData());
      this.props.dispatch(clearArtistPageError());
      this.getArtistData(nextProps.params.mbid);
    }
  }

  getArtistData(mbid) {
    this.props.dispatch(
      getArtistPageData(mbid)
    );
  } 

  renderBio(bioHtml) {
    return {
      __html : bioHtml
    };
  }

  renderSimilarArtists(similar) {
    return similar.map((artist, i) => {
      return (
        <li key={i}>
          <a href="#">{artist.name}</a>
          <img src={artist.image[1]['#text']} />
        </li>
      );
    });
  }

  render() {
    const {
      artistPageData,
      currentArtistPageError,
    } = this.props;
    console.log(this.props, 'l');
    if (artistPageData) {
      // sometimes lastfm returns successfully but with an empty 
      // json object. To counter this the reducer has a case for
      // this an returns and error property when it does happen
      if(artistPageData.error) {
        return(
          <h3>No artist found for this search result.</h3>
        )
      } else {
        return (
          <div className="artist">
            <h3>{artistPageData.name}</h3>
            <img 
              src={artistPageData.image} 
            />
            <div 
              className="artist-page__bio" 
              dangerouslySetInnerHTML={
                this.renderBio(artistPageData.bio.summary)
              } 
            />
            <div className="artist-page__similar">
              <ul className="artist-page__similar-list">
                {this.renderSimilarArtists(artistPageData.similar)}
              </ul>
            </div>

          </div>
        );
      }
    } else if(currentArtistPageError) {
      return(
        <h3>No artist found for this search result.</h3>
      );
    } else {
      return (
        <div className="route-content-spinner" />
      );
    }
  }
}

function mapStateToProps(state) {
  console.log('mmmmm', state);
  return {
    artistPageData: state.artistPage.artistPageData,
    currentArtistPageError: state.artistPage.currentArtistPageError,
  }
}

export default connect(mapStateToProps)(Artist);
