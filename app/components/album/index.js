import React from 'react'
import { connect } from 'react-redux'
import { getAlbumPageData, clearAlbumPageData } from '../../actions/album-actions'
import prepareUrlParamForUse from '../../utils/prepare-url-param-for-use'

class Album extends React.Component {
  
  // only call for data once the page
  // has rendered on the client as lastfm's
  // rate limiting allows 5 requests per second
  // per originating IP adress averaged over a 5 second period
  componentDidMount() {
    this.getAlbumData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.params.album !== this.props.params.album) {
      this.props.dispatch(clearAlbumPageData());
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
    } = this.props;
    
    if(currentAlbumPageAlbum) {    
      return (
        <div>
          <h3>{currentAlbumPageAlbum.name}</h3>
          <h4>{currentAlbumPageAlbum.artist}</h4>
          <img src={currentAlbumPageAlbum.image} />
          <ul>
            {this.renderTracks()}
          </ul>
        </div>
      );
    } else {
      return (
        <h1>LOADING!</h1>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    currentAlbum: state.currentAlbum,
    currentAlbumPageAlbum: state.currentAlbumPageAlbum,
  }
}

export default connect(mapStateToProps)(Album);
