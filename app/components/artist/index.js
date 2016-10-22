import React from 'react'
import { connect } from 'react-redux'
import { 
  clearArtistPageError, 
  getArtistPageData, 
  clearArtistPageData 
} from '../../actions/artist-actions'
import prepareUrlParamForUse from '../../utils/prepare-url-param-for-use'

class Artist extends React.Component {
  // only call for data once the page
  // has rendered on the client as lastfm's
  // rate limiting allows 5 requests per second
  // per originating IP adress averaged over a 5 minute period
  componentDidMount() {
    this.getArtistData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.params.artist !== this.props.params.artist) {
      // TODO:  investigate whether getArtistPageData action creator
      // can use a thunk as well as using promise middleware
      // if so we can just dispatch one action instead of three here
      this.props.dispatch(clearArtistPageData());
      this.props.dispatch(clearArtistPageError());
      this.getArtistData(nextProps);
    }
  }

  getArtistData(props) {
    const artist = prepareUrlParamForUse(
      props.params.artist
    );

    this.props.dispatch(
      getArtistPageData(
        artist,
      )
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
      currentArtist,
      artistPage,
      currentArtistPageError,
    } = this.props;
    
    if (artistPage) {
      // sometimes lastfm returns successfully but with an empty 
      // json object. To counter this the reducer has a case for
      // this an returns and error property when it does happen
      if(artistPage.error) {
        return(
          <h3>No artist found for this search result.</h3>
        )
      } else {
        return (
          <div>
            <h3>{artistPage.name}</h3>
            <img 
              src={artistPage.image} 
            />
            <div 
              className="artist-page__bio" 
              dangerouslySetInnerHTML={
                this.renderBio(artistPage.bio.summary)
              } 
            />
            <div className="artist-page__similar">
              <ul className="artist-page__similar-list">
                {this.renderSimilarArtists(artistPage.similar)}
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
        <div className="spinner" />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    currentArtist: state.currentArtist,
    artistPage: state.artistPage,
    currentArtistPageError: state.currentArtistPageError,
  }
}

export default connect(mapStateToProps)(Artist);
