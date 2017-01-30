import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Track from '../track';
import { 
  clearAlbumPageError, 
  getAlbumPageData, 
  clearAlbumPageData,
} from '../../actions/album';

import { 
  addTrackToQueueAndPlay,
  appendTracksToPlayQueue,
  replaceQueueWithTracksAndPlay,
} from '../../actions/play-queue';

export class Album extends React.Component {
  static propTypes = {
    clearAlbumPageError: PropTypes.func.isRequired,
    getAlbumPageData: PropTypes.func.isRequired, 
    clearAlbumPageData: PropTypes.func.isRequired,
    appendTracksToPlayQueue: PropTypes.func.isRequired,
    addTrackToQueueAndPlay: PropTypes.func.isRequired,
    replaceQueueWithTracksAndPlay: PropTypes.func.isRequired,
    albumPageData: PropTypes.object,
    currentAlbumPageError: PropTypes.string,
  };

  constructor() {
    super();
    this.appendAlbumToQueue = this.appendAlbumToQueue.bind(this);
    this.replaceQueueWithAlbumAndPlay = this.replaceQueueWithAlbumAndPlay.bind(this);
  }

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
      if(nextProps.params.mbid !== this.props.params.mbid) {
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

  // TODO : Break out in to a separate Tracks component
  renderTracks() {
    if(this.props.albumPageData.tracks) {
      return (
        <div className="tracks">
          <table className="tracks__table">
            <thead className="tracks__header">
              <tr>
                <th 
                  className="tracks__heading tracks__heading--no"
                >
                  No
                </th>
                <th 
                  className="tracks__heading tracks__heading--track"
                >
                  Track
                </th>
                <th 
                  className="tracks__heading tracks__heading--actions"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.albumPageData.tracks.map((track, i) => {
                  return (
                    <Track
                      rank={track['@attr'].rank}
                      name={track.name}
                      key={i}
                      onClick={
                        () => {
                          this.props.addTrackToQueueAndPlay(
                            track,
                            this.props.albumPageData.image
                          )
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
    } else {
      return null;
    }
  }

  appendAlbumToQueue() {
    this.props.appendTracksToPlayQueue(
     this.props.albumPageData.tracks,
     this.props.albumPageData.image,
    );
  }

  replaceQueueWithAlbumAndPlay() {
    this.props.replaceQueueWithTracksAndPlay(
      this.props.albumPageData.tracks,
      this.props.albumPageData.image,
    );
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
      if(albumPageData.error) {
        return(
          <h3>No album found for this search result.</h3>
        )
      } else {
        return (
          <div className="album">
            <div className="hero">
              <img 
                src={albumPageData.image} 
                className="hero__image"
                alt={`${albumPageData.name} by ${albumPageData.artist}`}
                width="174"
                height="174"
              />
              <h5 className="hero__identifier">Album</h5>
              <h1 className="hero__name">{albumPageData.name}</h1>
              <h3 className="hero__artist">{albumPageData.artist}</h3>
              <button 
                onClick={this.replaceQueueWithAlbumAndPlay}
                className="button button--primary button--play"
                >
                Play
              </button>
              <button 
                onClick={this.appendAlbumToQueue}
                className="button button--add"
                >
               Queue Album 
              </button>
            </div>
            {this.renderTracks()}
          </div>
        );
      }
    } else if(currentAlbumPageError) {
      return(
        <h3>No album found for this search result.</h3>
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
    currentAlbumPageError: state.currentAlbumPageError,
  }
}

const mapDispatchToProps = {
  clearAlbumPageError, 
  getAlbumPageData, 
  clearAlbumPageData,
  appendTracksToPlayQueue,
  addTrackToQueueAndPlay,
  replaceQueueWithTracksAndPlay,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Album);

