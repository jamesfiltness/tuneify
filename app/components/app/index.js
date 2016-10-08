import React from 'react'
import { connect } from 'react-redux'

import { searchPerformed } from '../../actions/search-actions'
import { playVideo } from '../../actions/player-actions'

import Search from '../search'
import SearchAutoComplete from '../search-autocomplete'
import YouTubePlayer from '../youtube-player'

class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    console.log('app render', this.props.videoData);
    const { 
      dispatch, 
      currentTrack,
      artists, 
      albums, 
      tracks,
      videoData,
    } = this.props;
 
    return (
      <div>
        <div>
          <Search 
            onSearch={ 
              text => dispatch(searchPerformed(text)) 
            } 
          />
          <SearchAutoComplete
            artists={artists}
            tracks={tracks}
            albums={albums}
          />
          <YouTubePlayer videoData={videoData} />
        </div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    currentSearch : state.currentSearch,
    artists : state.currentArtistResults,
    tracks : state.currentTrackResults,
    albums : state.currentAlbumResults,
    currentTrack: state.currentTrack,
    videoData: state.videoData,
  }
}

export default connect(mapStateToProps)(App)
