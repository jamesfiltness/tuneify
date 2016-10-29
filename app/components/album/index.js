import React from 'react'
import { connect } from 'react-redux'
import { 
  clearAlbumPageError, 
  getAlbumPageData, 
  clearAlbumPageData,
  appendAlbumToPlayQueue,
  replaceQueueWithAlbumAndPlay,
} from '../../actions/album-actions'
import prepareUrlParamForUse from '../../utils/prepare-url-param-for-use'

class Album extends React.Component {
  // only call for data once the page
  // has rendered on the client as lastfm's
  // rate limiting allows 5 requests per second
  // per originating IP adress averaged over a 5 album period
  constructor() {
    super();

    this.appendAlbumToQueue = this.appendAlbumToQueue.bind(this);
    this.replaceQueueWithAlbumAndPlay = this.replaceQueueWithAlbumAndPlay.bind(this);
  }

  componentDidMount() {
    this.getAlbumData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.params.album !== this.props.params.album) {
      // TODO:  investigate whether getAlbumPageData action creator
      // can use a thunk as well as using promise middleware
      // if so we can just dispatch one action instead of three here
      this.props.dispatch(clearAlbumPageData());
      this.props.dispatch(clearAlbumPageError());
      this.getAlbumData(nextProps);
    }
  }

  getAlbumData(props) {
    const album = prepareUrlParamForUse(
      props.params.album
    );

    const artist = prepareUrlParamForUse(
      props.params.artist
    );

    this.props.dispatch(
      getAlbumPageData(
        album, 
        artist
      )
    );
  } 

  renderTracks() {
    if(this.props.albumPage.tracks) {
      return (
        <table className="album__tracks-table">
          <tbody>
            {
              this.props.albumPage.tracks.map((track, i) => {
                return (
                  <tr className="album__track-row" key={i}>
                    <td className="album__track-cell">{track['@attr'].rank}</td>
                    <td className="album__track-cell">{track.name}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table> 
      )
    } else {
      return null;
    }
  }

  appendAlbumToQueue() {
    this.props.dispatch(
      appendAlbumToPlayQueue(
        this.props.albumPage.tracks
      )
    );
  }

  replaceQueueWithAlbumAndPlay() {
    this.props.dispatch(
      replaceQueueWithAlbumAndPlay(
        this.props.albumPage.tracks
      )
    );
  }

  render() {
    const {
      currentAlbum,
      albumPage,
      currentAlbumPageError,
    } = this.props;
    
    if (albumPage) {
      // sometimes lastfm returns successfully but with an empty 
      // json object. To counter this the reducer has a case for
      // this an returns and error property when it does happen
      if(albumPage.error) {
        return(
          <h3>No album found for this search result.</h3>
        )
      } else {
        return (
          <div className="album">
            <div className="album__header">
              <img 
                src={albumPage.image} 
                className="album__header-image"
                alt={`${albumPage.name} by ${albumPage.artist}`}
                width="174"
                height="174"
              />
              <h5 className="album__header-identifier">Album</h5>
              <h1 className="album__header-name">{albumPage.name}</h1>
              <h3 className="album__header-artist">{albumPage.artist}</h3>
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
                +
              </button>
            </div>
            <div className="album__tracks">
              {this.renderTracks()}
            </div>
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
    currentAlbum: state.currentAlbum,
    albumPage: state.albumPage,
    currentAlbumPageError: state.currentAlbumPageError,
  }
}

export default connect(mapStateToProps)(Album);
