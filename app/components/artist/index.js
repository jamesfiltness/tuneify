import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { 
  clearArtistPageError, 
  getArtistPageData, 
  clearArtistPageData 
} from '../../actions/artist';

export class Artist extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentArtistPageError: PropTypes.string,
    artistPageData: PropTypes.object,
  }

  componentDidMount() {
    if (this.props.params.mbid) {
      this.getArtistData({ mbid: this.props.params.mbid });
    } else {
      this.getArtistData({ artist: this.props.params.artist });
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.params.mbid) {
      if(nextProps.params.mbid !== this.props.params.mbid) {
        // TODO:  investigate whether getArtistPageData action creator
        // can use a thunk as well as using promise middleware
        // if so we can just dispatch one action instead of three here
        this.props.dispatch(clearArtistPageData());
        this.props.dispatch(clearArtistPageError());
        this.getArtistData({ mbid: nextProps.params.mbid });
      }
    } else if (nextProps.params.artist !== this.props.params.artist) {
      this.props.dispatch(clearArtistPageData());
      this.props.dispatch(clearArtistPageError());
      this.getArtistData({ artist: nextProps.params.artist });
    }
  }

  getArtistData(params) {
    this.props.dispatch(
      getArtistPageData(params)
    );
  } 

  renderBio(bioHtml) {
    return {
      __html : bioHtml 
    };
  }

  renderSimilarArtists(similar) {
    if (similar && similar.length > 0) {
      return similar.map((artist, i) => {
        return (
          <li 
            className="artist__similar-artist-item" 
            key={i}
          >
          <div className="artist__similar-artist-wrap">
            <a 
              className="artist__similar-artist-link" 
              href="#"
            >
              <img
                className="artist__similar-artist-image"
                src={artist.image[1]['#text']} 
              />
              <span 
                className="artist__similar-artist-text"
              >
                {artist.name}
              </span>
            </a>
            </div>
          </li>
        );
      });
    }
  }

  render() {
    const {
      artistPageData,
      currentArtistPageError,
    } = this.props;
    
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
            <div className="hero">
              <img 
                src={artistPageData.image} 
                className="hero__image"
                alt={artistPageData.name}
                width="174"
                height="174"
              />
              <h5 className="hero__identifier">Artist</h5>
              <h1 className="hero__name">{artistPageData.name}</h1>
              <div 
                className="artist__bio" 
                dangerouslySetInnerHTML={
                  this.renderBio(`${artistPageData.bio.summary}`)
                } 
              />
              <p 
                className="artist__read-more"
              >
                <a 
                  href="#"
                  className="artist__read-more-link"
                >Read more</a>
              </p>
            </div>
            <div className="artist__similar">
              <h4 className="uppercase">Similar artists</h4>
              <ul className="artist__similar-list">
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
  return {
    artistPageData: state.artistPage.artistPageData,
    currentArtistPageError: state.artistPage.currentArtistPageError,
  }
}

export default connect(mapStateToProps)(Artist);
