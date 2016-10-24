import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { searchPerformed } from '../../actions/search-actions';
import { playVideo } from '../../actions/player-actions';

import Search from '../search';
import SearchAutoComplete from '../search-autocomplete';
import YouTubePlayer from '../youtube-player';
import PlayQueue from '../play-queue';

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
      playQueue,
    } = this.props;
    
    return (
      <div className="app">
        <header className="header">
          <div className="header__container">
            <h1 className="header__title">
              <Link 
                className="header__title-link" 
                to="/"
              >
                Tuneify
              </Link>
            </h1>
            <Search 
              onSearch={ 
                text => dispatch(searchPerformed(text)) 
              } 
            />
          </div>
        </header>
        <div className="sidebar sidebar--left">
        </div>
        <SearchAutoComplete
          artists={artists}
          tracks={tracks}
          albums={albums}
        />
        <div className="route-content">
          {this.props.children}
        </div>
        <div className="sidebar sidebar--right">
          <YouTubePlayer videoData={videoData} />
          <PlayQueue tracks={playQueue} />
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
    playQueue: state.playQueue,
  }
}

export default connect(mapStateToProps)(App)
