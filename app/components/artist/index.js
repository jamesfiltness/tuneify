import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  clearArtistPageError,
  getArtistPageData,
  getArtistAlbums,
  clearArtistPageData,
  getSimilarArtists,
} from '../../actions/artist';

export class Artist extends React.Component {
  static propTypes = {
    currentArtistPageError: PropTypes.string,
    artistPageData: PropTypes.object,
  }

  componentDidMount() {
    if (this.props.params.mbid) {
      this.getArtistByMbid(this.props.params.mbid);
    } else {
      this.getArtistByName(this.props.params.artist)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.params.mbid) {
      if(nextProps.params.mbid !== this.props.params.mbid) {
        this.getArtistByMbid(nextProps.params.mbid);
      }
    } else if (nextProps.params.artist !== this.props.params.artist) {
      this.getArtistByName(nextProps.params.artist);
    }
  }

  clearArtistPageContent() {
    this.props.clearArtistPageData();
    this.props.clearArtistPageError();
  }

  getArtistByMbid(mbid) {
    this.clearArtistPageContent();
    this.getArtistData({ mbid: mbid });
  }

  getArtistByName(artist) {
    this.clearArtistPageContent();
    this.getArtistData({ artist: artist });
  }

  getArtistData(params) {
    this.props.getArtistPageData(params);
    this.props.getArtistAlbums(params);
    this.props.getSimilarArtists(params);
  }

  renderBio(bioHtml) {
    return {
      __html : bioHtml
    };
  }

  // TODO: Break this and render albums out in to a seperate component
  renderSimilarArtists() {
    console.log(this.props);
    if (this.props.similarArtists) {
      return (
        <div className="artist__related">
          <h4 className="uppercase">Similar Artists</h4>
          <ul className="artist__related-list">
            {
              this.props.similarArtists.map(
                (artist, i) => {
                  const image = artist.image[2]['#text'];
                  const mbid = artist.mbid;

                  if (image && mbid) {
                    return (
                      <li
                        key={i}
                        className="artist__related-item"
                      >
                        <Link
                          to={`/artist/${mbid}`}
                          className="artist__related-link"
                        >
                          <img
                            src={image}
                            alt={artist.name}
                            className="artist__related-image"
                          />
                          <span className="artist__related-text">
                            {artist.name}
                          </span>
                        </Link>
                      </li>
                    )
                  }
                }
              )
            }
          </ul>
        </div>
      )
    }

    return (
      <div className="route-content-spinner" />
    )
  }

  renderAlbums() {
    if (this.props.artistPageAlbum) {
      return (
        <div className="artist__related">
          <h4 className="uppercase">Top Albums</h4>
          <ul className="artist__related-list">
            {
              this.props.artistPageAlbum.map(
                (album, i) => {
                  const image = album.image[2]['#text'];
                  const mbid = album.mbid;

                  if (image && mbid) {
                    return (
                      <li
                        key={i}
                        className="artist__related-item"
                      >
                        <Link
                          to={`/album/${mbid}`}
                          className="artist__related-link"
                        >
                          <img
                            src={image}
                            alt={album.name}
                            className="artist__related-image"
                          />
                          <span className="artist__related-text">
                            {album.name}
                          </span>
                        </Link>
                      </li>
                    )
                  }
                }
              )
            }
          </ul>
        </div>
      )
    }

    return (
      <div className="route-content-spinner" />
    )
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
            {this.renderAlbums()}
            {this.renderSimilarArtists()}
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

const mapDispatchToProps = {
  clearArtistPageError,
  getArtistPageData,
  getArtistAlbums,
  clearArtistPageData,
  getSimilarArtists,
}

function mapStateToProps(state) {
  return {
    artistPageData: state.artistPage.artistPageData,
    artistPageAlbum: state.artistPage.artistPageAlbum,
    currentArtistPageError: state.artistPage.currentArtistPageError,
    similarArtists: state.artistPage.similarArtists,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Artist);
