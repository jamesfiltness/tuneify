import React, { PropTypes } from 'react';
import postToFeed from '../../utils/post-to-fb-feed';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ErrorMessage from '../error-message';
import {
  clearArtistPageError,
  getArtistPageData,
  getArtistAlbums,
  clearArtistPageData,
  getSimilarArtists,
  showFullBio,
} from '../../actions/artist';

export class Artist extends React.Component {
  static propTypes = {
    currentArtistPageError: PropTypes.bool,
    artistPageData: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.showFullBio = this.showFullBio.bind(this);
    this.handleFacebookShare = this.handleFacebookShare.bind(this);
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
    const bio = bioHtml.replace("Read more on Last.fm", '');
    return {
      __html : bio
    };
  }

  showFullBio() {
    this.props.showFullBio(this.props);
  }

  // TODO: Break this and render albums out in to a seperate component
  renderSimilarArtists() {
    if (this.props.similarArtists) {
      return (
        <div className="content-result">
          <h4 className="uppercase">Similar Artists</h4>
          <ul className="content-result__list">
            {
              this.props.similarArtists.map(
                (artist, i) => {
                  const image = artist.image[2]['#text'];
                  const mbid = artist.mbid;

                  if (image && mbid) {
                    return (
                      <li
                        key={i}
                        className="content-result__item"
                      >
                        <Link
                          to={`/artist/${mbid}`}
                          className="content-result__link"
                        >
                          <img
                            src={image}
                            alt={artist.name}
                            className="content-result__image"
                          />
                          <span className="content-result__text">
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
        <div className="content-result">
          <h4 className="uppercase">Top Albums</h4>
          <ul className="content-result__list">
            {
              this.props.artistPageAlbum.map(
                (album, i) => {
                  const image = album.image[2]['#text'];
                  const mbid = album.mbid;

                  if (image && mbid) {
                    return (
                      <li
                        key={i}
                        className="content-result__item"
                      >
                        <Link
                          to={`/album/${mbid}`}
                          className="content-result__link"
                        >
                          <img
                            src={image}
                            alt={album.name}
                            className="content-result__image"
                          />
                          <span className="content-result__text">
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

  getShareData() {
    const name = this.props.artistPageData.name;
    const description = `Listen to ${name} for free on Tuneify.com`;
    const image = this.props.artistPageData.image;
    const link = `https://tuneify.fm/artist/${encodeURIComponent(this.props.params.mbid)}`;

    return {
      name,
      description,
      image,
      link,
    }
  }

  handleFacebookShare(e) {
    const shareData = this.getShareData();
    e.preventDefault();
    postToFeed(
      shareData.name,
      shareData.description,
      shareData.link,
      shareData.image
    );
  }

  getTwitterLink() {
    // TODO: Optimise this - call getShareData in constructor and assign to this
    // for reuse
    const shareData = this.getShareData();
    const text = `Listen to ${encodeURIComponent(shareData.name)} for free on Tuneify.com`;
    return `https://twitter.com/intent/tweet?text=${text}&url=${shareData.link}`;
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
        return (
          <ErrorMessage />
        )
      } else {
        return (
          <div className="artist page-with-padding">
            <a
              onClick={this.handleFacebookShare}
              data-layout="button"
              className="facebook-share"
            ></a>
            <a
              className="twitter-share"
              href={this.getTwitterLink()}>
            </a>
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
                  onClick={this.showFullBio}
                >Read more</a>
              </p>
            </div>
            {this.renderAlbums()}
            {this.renderSimilarArtists()}
          </div>
        );
      }
    } else if(currentArtistPageError) {
      return (
        <ErrorMessage />
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
  showFullBio,
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
