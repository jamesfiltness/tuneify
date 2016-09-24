import React from 'react'
import { connect } from 'react-redux'

import { searchPerformed } from '../../actions/search-actions'
import { cueVideo } from '../../actions/player-actions'

import Search from '../search'
import SearchAutoComplete from '../search-autocomplete'
import YouTubePlayer from '../youtube-player'

class App extends React.Component {

  render() {
    const { 
      dispatch, 
      currentVideo, 
      artists, 
      albums, 
      tracks 
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
          <YouTubePlayer 
            currentVideo={currentVideo} 
          />
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
    currentVideo : state.currentVideo,
    artists : state.currentArtistResults,
    tracks : state.currentTrackResults,
    albums : state.currentAlbumResults
  }
}

export default connect(mapStateToProps)(App)
