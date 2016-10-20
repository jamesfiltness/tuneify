import React from 'react'
import { connect } from 'react-redux'
import { 
  clearAlbumPageError, 
  getAlbumPageData, 
  clearAlbumPageData 
} from '../../actions/album-actions'
import prepareUrlParamForUse from '../../utils/prepare-url-param-for-use'

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      clientRender: false,
    }
  } 
  // only call for data once the page
  // has rendered on the client as lastfm's
  // rate limiting allows 5 requests per second
  // per originating IP adress averaged over a 5 second period
  componentDidMount() {
    this.getAlbumData(this.props);

    this.setState({
      clientRender: true,
    })
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
    if(this.props.currentAlbumPageAlbum.tracks) {
      return (
        this.props.currentAlbumPageAlbum.tracks.map((track, i) => {
          return (
            <li key={i}>{track.name}</li>
          )
        })
      )
    } else {
      return null;
    }
  }

  render() {
    const {
      currentAlbum,
      currentAlbumPageAlbum,
      currentAlbumPageError,
    } = this.props;
   console.log(currentAlbumPageAlbum); 
    if(this.state.clientRender) {
    if ( currentAlbumPageAlbum) {

      if(currentAlbumPageAlbum.error) {
        return(
        <h3>No album found for this search result.</h3>
        )
      } else {
      return (
        <div>
          <h3>{currentAlbumPageAlbum.name}</h3>
          <h4>{currentAlbumPageAlbum.artist}</h4>
          <img 
            src={currentAlbumPageAlbum.image} 
            alt={`${currentAlbumPageAlbum.name} by ${currentAlbumPageAlbum.artist}`} 
          />
          <ul>
            {this.renderTracks()}
          </ul>
        </div>
      );
      }
    } else if(currentAlbumPageError) {
      return(
        <h3>No album found for this search result.</h3>
      );
    } else {
      return (
      <div>
        <h1>LOADING!</h1>
        <img src="/images/spinner.svg" />
        </div>
      );
    }
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    currentAlbum: state.currentAlbum,
    currentAlbumPageAlbum: state.currentAlbumPageAlbum,
    currentAlbumPageError: state.currentAlbumPageError,
  }
}

export default connect(mapStateToProps)(Album);
