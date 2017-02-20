import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Playlist from '../playlist';
import ErrorMessage from '../error-message';
import {
  clearAlbumPageError,
  getAlbumPageData,
  clearAlbumPageData,
} from '../../actions/album';

export class Album extends React.Component {
  static propTypes = {
    clearAlbumPageError: PropTypes.func.isRequired,
    getAlbumPageData: PropTypes.func.isRequired,
    clearAlbumPageData: PropTypes.func.isRequired,
    albumPageData: PropTypes.object,
    currentAlbumPageError: PropTypes.bool,
  };

  componentDidMount() {
    if (this.props.params.mbid) {
      this.getAlbumDataByMbid(this.props.params.mbid);
    } else {
      this.getAlbumDataByName(
        this.props.params.artist,
        this.props.params.album
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.mbid) {
      if (nextProps.params.mbid !== this.props.params.mbid) {
        this.getAlbumDataByMbid(nextProps.params.mbid);
      }
    } else if (nextProps.params.album !== this.props.params.album) {
      this.getAlbumDataByName(nextProps.params.artist, nextProps.params.album);
    }
  }

  getAlbumDataByMbid(mbid) {
    // TODO: investigate whether getAlbumPageData action creator
    // can use a thunk as well as using promise middleware
    // if so we can just dispatch one action instead of three here
    this.props.clearAlbumPageData();
    this.props.clearAlbumPageError();
    this.props.getAlbumPageData({ mbid: mbid });
  }

  getAlbumDataByName(artist, album) {
    this.props.clearAlbumPageData();
    this.props.clearAlbumPageError();
    this.props.getAlbumPageData({
      artist: artist,
      album: album
    });
  }

  render() {
    const {
      albumPageData,
      currentAlbumPageError,
    } = this.props;

    if (albumPageData) {
      // sometimes lastfm returns successfully but with an empty
      // json object. To counter this the reducer has a case for
      // this an returns and error property when it does happen
      return (
        <Playlist
          tracks={albumPageData.tracks}
          heading="Album"
          name={albumPageData.name}
          artist={albumPageData.artist}
          image={albumPageData.image}
        />
      );
    } else if (currentAlbumPageError) {
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

function mapStateToProps(state) {
  return {
    albumPageData: state.albumPage.albumPageData,
    currentAlbumPageError: state.albumPage.currentAlbumPageError,
  }
}

const mapDispatchToProps = {
  clearAlbumPageError,
  getAlbumPageData,
  clearAlbumPageData,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Album);

