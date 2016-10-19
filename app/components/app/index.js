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
        <header className="header">
          <div className="header__container">
            <h1 className="header__title">Tuneify</h1> 
            <Search 
              onSearch={ 
                text => dispatch(searchPerformed(text)) 
              } 
            />
          </div>
        </header>
        <div>
          <SearchAutoComplete
            artists={artists}
            tracks={tracks}
            albums={albums}
          />
          <YouTubePlayer videoData={videoData} />
        </div>
        <div className="route-content">
          {this.props.children}
        </div>
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